"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AustraliaMap } from "@/components/AustraliaMap";
import { DebugPanel } from "@/components/DebugPanel";
import { NpcBubble } from "@/components/NpcBubble";
import { ProgressBar } from "@/components/ProgressBar";
import { useJourney } from "@/components/useJourney";

function JourneyInner() {
  const { state, ready } = useJourney();
  const search = useSearchParams();
  const debug = search.get("debug") === "true";

  if (!ready) return null;

  return (
    <main className="screen">
      <div className="texture" />
      <div className="mobileFrame pageEnter">
        <ProgressBar state={state} />
        <NpcBubble>先看地图。选择一个 DAY 之后，再决定今天走主线、抽支线，还是自由探索。</NpcBubble>
        <AustraliaMap state={state} />
        <nav className="bottomNav" aria-label="底部导航">
          <Link href="/memories">查看我的记录</Link>
          {state.journeyCompleted ? <Link href="/final">第一周完成</Link> : null}
        </nav>
        {debug ? <DebugPanel state={state} /> : null}
      </div>
    </main>
  );
}

export default function JourneyPage() {
  return (
    <Suspense fallback={null}>
      <JourneyInner />
    </Suspense>
  );
}
