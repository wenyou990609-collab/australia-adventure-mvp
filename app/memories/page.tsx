"use client";

import Link from "next/link";
import { MemoryTimeline, ShareCard } from "@/components/MemoryCard";
import { useJourney } from "@/components/useJourney";

export default function MemoriesPage() {
  const { state, ready } = useJourney();

  if (!ready) return null;

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame memoriesPage pageEnter">
        <Link className="backLink" href="/journey">← 回到地图</Link>
        <p className="eyebrow">7日回忆录</p>
        <h1 className="bubbleTitle">《来到这里的第一个星期》</h1>
        <MemoryTimeline state={state} />
        <div className="later">7 DAYS LATER<br />你已经走完了新手村。</div>
        <ShareCard />
      </section>
    </main>
  );
}
