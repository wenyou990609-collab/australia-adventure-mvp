"use client";

import { tasks } from "@/data/tasks";
import { sideEvents } from "@/data/sideEvents";
import type { JourneyState, Mood, TaskStatus } from "@/types/journey";

export const STORAGE_KEY = "study-abroad-starter-village";

export function createInitialJourney(started = false): JourneyState {
  return {
    started,
    currentTaskId: 1,
    completedTaskIds: [],
    delayedTaskIds: [],
    seenCompletionTaskIds: [],
    days: Array.from({ length: 7 }, (_, index) => {
      const day = index + 1;
      return {
        day,
        taskIds: tasks.filter((task) => task.day === day).map((task) => task.id),
        sideEventIds: [],
        sideRefreshesLeft: 3,
        freeExplored: false,
        completed: false
      };
    }),
    journeyCompleted: false
  };
}

export function loadJourney(): JourneyState {
  if (typeof window === "undefined") return createInitialJourney();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialJourney();

  try {
    const parsed = JSON.parse(raw) as JourneyState;
    return {
      ...createInitialJourney(parsed.started),
      ...parsed,
      days: createInitialJourney(parsed.started).days.map((day) => ({
        ...day,
        ...parsed.days?.find((item) => item.day === day.day)
      }))
    };
  } catch {
    return createInitialJourney();
  }
}

export function saveJourney(state: JourneyState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("starter-village-updated"));
}

export function startJourney() {
  const state = createInitialJourney(true);
  saveJourney(state);
  return state;
}

export function resetJourney() {
  const state = createInitialJourney(false);
  saveJourney(state);
  return state;
}

export function getTaskStatus(taskId: number, state: JourneyState): TaskStatus {
  if (state.completedTaskIds.includes(taskId)) return "completed";
  if (state.currentTaskId === taskId) {
    return state.delayedTaskIds.includes(taskId) ? "delayed" : "available";
  }
  return taskId < state.currentTaskId ? "completed" : "locked";
}

export function completeTask(taskId: number, state = loadJourney()): JourneyState {
  const completedTaskIds = Array.from(new Set([...state.completedTaskIds, taskId])).sort((a, b) => a - b);
  const delayedTaskIds = state.delayedTaskIds.filter((id) => id !== taskId);
  const nextTask = tasks.find((task) => task.id > taskId && !completedTaskIds.includes(task.id));
  const journeyCompleted = completedTaskIds.length >= tasks.length;
  const days = state.days.map((day) => ({
    ...day,
    completed: day.taskIds.every((id) => completedTaskIds.includes(id))
  }));

  const nextState = {
    ...state,
    completedTaskIds,
    delayedTaskIds,
    currentTaskId: nextTask?.id ?? taskId,
    days,
    journeyCompleted
  };
  saveJourney(nextState);
  return nextState;
}

export function delayTask(taskId: number, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    delayedTaskIds: Array.from(new Set([...state.delayedTaskIds, taskId]))
  };
  saveJourney(nextState);
  return nextState;
}

export function savePhoto(day: number, photo: string | undefined, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    days: state.days.map((record) => (record.day === day ? { ...record, photo } : record))
  };
  saveJourney(nextState);
  return nextState;
}

export function saveMood(day: number, mood: Mood, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    days: state.days.map((record) => (record.day === day ? { ...record, mood } : record))
  };
  saveJourney(nextState);
  return nextState;
}

export function saveDayNote(day: number, note: string, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    days: state.days.map((record) => (record.day === day ? { ...record, note } : record))
  };
  saveJourney(nextState);
  return nextState;
}

function seededEventIds(day: number, salt = 0) {
  const ids = sideEvents.map((event) => event.id);
  return ids
    .map((id) => ({ id, score: Math.sin((id + 13) * (day + 3) * (salt + 1)) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((item) => item.id);
}

export function drawSideEvents(day: number, state = loadJourney()): JourneyState {
  const record = state.days.find((item) => item.day === day);
  if (record?.sideEventIds?.length) return state;

  const nextState = {
    ...state,
    days: state.days.map((item) =>
      item.day === day
        ? {
            ...item,
            sideEventIds: seededEventIds(day),
            sideRefreshesLeft: item.sideRefreshesLeft ?? 3
          }
        : item
    )
  };
  saveJourney(nextState);
  return nextState;
}

export function refreshSideEvent(day: number, slotIndex: number, state = loadJourney()): JourneyState {
  const record = state.days.find((item) => item.day === day);
  if (!record || (record.sideRefreshesLeft ?? 0) <= 0) return state;

  const used = new Set(record.sideEventIds ?? []);
  const salt = 3 - (record.sideRefreshesLeft ?? 3) + slotIndex + 1;
  const replacement = seededEventIds(day, salt).find((id) => !used.has(id)) ?? sideEvents.find((event) => !used.has(event.id))?.id;
  if (!replacement) return state;

  const nextIds = [...(record.sideEventIds ?? seededEventIds(day))];
  nextIds[slotIndex] = replacement;

  const nextState = {
    ...state,
    days: state.days.map((item) =>
      item.day === day
        ? {
            ...item,
            sideEventIds: nextIds,
            sideRefreshesLeft: Math.max(0, (item.sideRefreshesLeft ?? 3) - 1)
          }
        : item
    )
  };
  saveJourney(nextState);
  return nextState;
}

export function selectSideEvent(day: number, eventId: number, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    days: state.days.map((record) => (record.day === day ? { ...record, selectedSideEventId: eventId } : record))
  };
  saveJourney(nextState);
  return nextState;
}

export function markFreeExplore(day: number, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    days: state.days.map((record) => (record.day === day ? { ...record, freeExplored: true } : record))
  };
  saveJourney(nextState);
  return nextState;
}

export function markCompletionSeen(taskId: number, state = loadJourney()): JourneyState {
  const nextState = {
    ...state,
    seenCompletionTaskIds: Array.from(new Set([...state.seenCompletionTaskIds, taskId]))
  };
  saveJourney(nextState);
  return nextState;
}

export function unlockAll(state = loadJourney()): JourneyState {
  const completedTaskIds = tasks.map((task) => task.id);
  const nextState = {
    ...state,
    started: true,
    currentTaskId: tasks[tasks.length - 1].id,
    completedTaskIds,
    delayedTaskIds: [],
    days: state.days.map((day) => ({ ...day, completed: true })),
    journeyCompleted: true
  };
  saveJourney(nextState);
  return nextState;
}

export function jumpToDay(day: number, state = loadJourney()): JourneyState {
  const firstTask = tasks.find((task) => task.day === day) ?? tasks[0];
  const completedTaskIds = tasks.filter((task) => task.id < firstTask.id).map((task) => task.id);
  const nextState = {
    ...state,
    started: true,
    currentTaskId: firstTask.id,
    completedTaskIds,
    delayedTaskIds: [],
    days: state.days.map((record) => ({
      ...record,
      completed: record.taskIds.every((id) => completedTaskIds.includes(id))
    })),
    journeyCompleted: false
  };
  saveJourney(nextState);
  return nextState;
}

export function getCurrentDay(state: JourneyState) {
  if (state.journeyCompleted) return 7;
  return tasks.find((task) => task.id === state.currentTaskId)?.day ?? 1;
}
