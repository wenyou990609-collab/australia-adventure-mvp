"use client";

import { useRouter } from "next/navigation";
import { MoodSelector, moodNote } from "@/components/MoodSelector";
import { useJourney } from "@/components/useJourney";
import { saveMood } from "@/lib/storage";

export default function ReflectionPage({ day }: { day: number }) {
  const router = useRouter();
  const { state, ready } = useJourney();
  const record = state.days.find((item) => item.day === day);

  if (!ready || !record) return null;

  const next = state.journeyCompleted ? "/final" : "/journey";

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame centered pageEnter">
        <p className="eyebrow">每日反馈</p>
        <h1 className="bubbleTitle">今天过得怎么样？</h1>
        <MoodSelector value={record.mood} onChange={(mood) => saveMood(day, mood, state)} />
        {record.mood ? <p className="notice">{moodNote(record.mood)}</p> : null}
        <button className="primaryButton" type="button" onClick={() => router.push(next)} disabled={!record.mood}>
          {state.journeyCompleted ? "进入第一周终章" : "回到地图"}
        </button>
      </section>
    </main>
  );
}
