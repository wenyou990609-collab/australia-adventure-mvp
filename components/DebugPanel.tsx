"use client";

import Link from "next/link";
import { completeTask, jumpToDay, resetJourney, unlockAll } from "@/lib/storage";
import type { JourneyState } from "@/types/journey";

export function DebugPanel({ state }: { state: JourneyState }) {
  return (
    <section className="debugPanel">
      <h2>Developer Panel</h2>
      <div className="debugGrid">
        <button type="button" onClick={() => resetJourney()}>Reset Progress</button>
        <button type="button" onClick={() => completeTask(state.currentTaskId)}>Complete Current</button>
        <button type="button" onClick={() => unlockAll()}>Unlock All</button>
        {Array.from({ length: 7 }, (_, index) => index + 1).map((day) => (
          <button key={day} type="button" onClick={() => jumpToDay(day)}>Jump Day {day}</button>
        ))}
        <Link href="/final">Open Final Page</Link>
      </div>
    </section>
  );
}
