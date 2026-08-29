"use client";

import Link from "next/link";
import { useEffect } from "react";
import { NpcBubble } from "@/components/NpcBubble";
import { useJourney } from "@/components/useJourney";
import { sideEvents } from "@/data/sideEvents";
import { drawSideEvents, refreshSideEvent, selectSideEvent } from "@/lib/storage";

export default function SideQuestPage({ day }: { day: number }) {
  const { state, ready } = useJourney();
  const record = state.days.find((item) => item.day === day);

  useEffect(() => {
    if (ready) drawSideEvents(day, state);
  }, [day, ready, state]);

  if (!ready || !record) return null;

  const ids = record.sideEventIds?.length ? record.sideEventIds : [];
  const selected = sideEvents.find((event) => event.id === record.selectedSideEventId);

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame pageEnter">
        <Link className="backLink" href="/journey">← 回到地图</Link>
        <p className="eyebrow">SIDE QUEST LOTTERY</p>
        <h1 className="bubbleTitle">海克斯事件抽奖</h1>
        <NpcBubble>{selected ? selected.npcLine : "主线太硬也没关系。今天可以抽一张轻一点的事件卡，让城市露出一点新边角。"}</NpcBubble>
        <p className="lotteryMeta">DAY {day} · 剩余刷新 {record.sideRefreshesLeft ?? 3} 次</p>
        <div className="eventGrid">
          {ids.map((id, index) => {
            const event = sideEvents.find((item) => item.id === id);
            if (!event) return null;
            const active = record.selectedSideEventId === event.id;
            return (
              <article className={`eventCard ${active ? "selected" : ""}`} key={`${event.id}-${index}`}>
                <span>{event.icon}</span>
                <p>{event.tag} · {event.city === "Both" ? "悉尼/墨尔本" : event.city}</p>
                <h2>{event.title}</h2>
                <strong>{event.description}</strong>
                <div className="eventActions">
                  <button className="primaryButton smallButton" type="button" onClick={() => selectSideEvent(day, event.id, state)}>
                    选这张
                  </button>
                  <button
                    className="ghostButton"
                    type="button"
                    disabled={(record.sideRefreshesLeft ?? 0) <= 0 || active}
                    onClick={() => refreshSideEvent(day, index, state)}
                  >
                    刷新
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {selected ? (
          <section className="selectedEvent">
            <p>已选择支线</p>
            <h2>{selected.icon} {selected.title}</h2>
            <span>{selected.description}</span>
          </section>
        ) : null}
        <div className="routePrompt">
          <Link className="secondaryButton" href={`/main/${day}`}>回主线看板</Link>
          <Link className="ghostButton" href={`/free/${day}`}>今天下班自由走走</Link>
        </div>
      </section>
    </main>
  );
}
