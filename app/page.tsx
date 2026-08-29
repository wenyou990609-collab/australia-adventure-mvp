"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Character } from "@/components/Character";
import { useJourney } from "@/components/useJourney";
import { startJourney } from "@/lib/storage";

export default function OpeningPage() {
  const router = useRouter();
  const { state, ready } = useJourney();

  useEffect(() => {
    if (ready && state.started) router.replace("/journey");
  }, [ready, router, state.started]);

  if (!ready) return null;

  if (state.started) return null;

  return (
    <main className="screen opening">
      <div className="texture" />
      <section className="openingPanel pageEnter">
        <Character />
        <p className="eyebrow">WELCOME</p>
        <h1 className="bubbleTitle">欢迎来到澳洲新地图。</h1>
        <div className="storyText">
          <p>接下来的 7 天，你可以在悉尼或墨尔本完成主线，也可以抽一张支线事件卡。</p>
          <p>如果今天只想休息，也可以自由探索。</p>
          <p>新地图不用一天跑完，我们一天解锁一点。</p>
        </div>
        <button
          className="primaryButton"
          type="button"
          onClick={() => {
            startJourney();
            router.push("/journey");
          }}
        >
          开始澳洲大冒险
        </button>
      </section>
    </main>
  );
}
