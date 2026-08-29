"use client";

import Link from "next/link";
import { NpcBubble } from "@/components/NpcBubble";
import { useJourney } from "@/components/useJourney";
import { markFreeExplore, saveDayNote } from "@/lib/storage";

export default function FreeExplorePage({ day }: { day: number }) {
  const { state, ready } = useJourney();
  const record = state.days.find((item) => item.day === day);

  if (!ready || !record) return null;

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame centered pageEnter">
        <Link className="backLink" href="/journey">← 回到地图</Link>
        <p className="eyebrow">FREE EXPLORE</p>
        <h1 className="bubbleTitle">自由探索</h1>
        <NpcBubble>下班。今天不推进主线也不抽卡，你仍然在适应新地图。</NpcBubble>
        <div className="storyText">
          <p>可以散步，可以休息，可以只熟悉一条回家的路。</p>
          <p>如果愿意，给今天写一句自己的冒险记录。</p>
        </div>
        <textarea
          className="diaryInput"
          value={record.note ?? ""}
          placeholder="今天我在澳洲注意到..."
          onChange={(event) => saveDayNote(day, event.target.value, state)}
        />
        <button className="primaryButton" type="button" onClick={() => markFreeExplore(day, state)}>
          标记今天自由探索
        </button>
        {record.freeExplored ? <p className="notice">今天已经下班。地图没有催你，但它记住了你来过。</p> : null}
      </section>
    </main>
  );
}
