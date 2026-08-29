export type TaskStatus = "locked" | "available" | "completed" | "delayed";

export type Mood = "good" | "tired" | "hard";

export interface Task {
  id: number;
  day: number;
  city?: "Sydney" | "Melbourne" | "Both";
  title: string;
  realTitle: string;
  description: string;
  why: string;
  preparation?: string[];
  steps?: string[];
  suggestedTime?: string;
  challenge?: string[];
  completionText: string;
  unlockText: string;
  nodeText: string;
  photoHint?: string;
  icon: string;
}

export interface DayRecord {
  day: number;
  taskIds: number[];
  photo?: string;
  mood?: Mood;
  note?: string;
  sideEventIds?: number[];
  selectedSideEventId?: number;
  sideRefreshesLeft?: number;
  freeExplored?: boolean;
  completed: boolean;
}

export interface JourneyState {
  started: boolean;
  currentTaskId: number;
  completedTaskIds: number[];
  delayedTaskIds: number[];
  seenCompletionTaskIds: number[];
  days: DayRecord[];
  journeyCompleted: boolean;
}
