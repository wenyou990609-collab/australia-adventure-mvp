"use client";

import Link from "next/link";
import { ModePicker } from "@/components/ModePicker";
import { NpcBubble } from "@/components/NpcBubble";
import { useJourney } from "@/components/useJourney";
import { tasks } from "@/data/tasks";
import { getCurrentDay } from "@/lib/storage";

export default function DayPage({ day }: { day: number }) {
  const { state, ready } = useJourney();

  if (!ready) return null;

  const currentDay = getCurrentDay(state);
  const dayTasks = tasks.filter((task) => task.day === day);
  const completedCount = dayTasks.filter((task) => state.completedTaskIds.includes(task.id)).length;
  const isFuture = day > currentDay && completedCount < dayTasks.length;

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame dayChoicePage pageEnter">
        <Link className="backLink" href="/journey">← 回到地图系统</Link>
        <p className="eyebrow">DAY SELECTED</p>
        <h1 className="bubbleTitle">DAY {day}</h1>
        {isFuture ? (
          <>
            <NpcBubble>这一天还藏在云后面。先把当前 DAY 的主线推进一点，地图会慢慢亮起来。</NpcBubble>
            <Link className="primaryButton" href={`/day/${currentDay}`}>回到今日据点</Link>
          </>
        ) : (
          <>
            <section className="daySummary">
              <span>{completedCount} / {dayTasks.length}</span>
              <div>
                <h2>{day === currentDay ? "今日据点" : "已解锁日期"}</h2>
                <p>进入这一天后，再选择今天要推进的玩法。</p>
              </div>
            </section>
            <NpcBubble>DAY {day} 已进入。今天可以做一件硬核生存任务，也可以抽一张轻一点的支线事件。</NpcBubble>
            <ModePicker day={day} state={state} />
          </>
        )}
      </section>
    </main>
  );
}
