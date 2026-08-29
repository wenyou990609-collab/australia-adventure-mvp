"use client";

import Link from "next/link";
import { NpcBubble } from "@/components/NpcBubble";
import { useJourney } from "@/components/useJourney";
import { getTaskStatus } from "@/lib/storage";
import { tasks } from "@/data/tasks";

export default function MainBoardPage({ day }: { day: number }) {
  const { state, ready } = useJourney();
  const dayTasks = tasks.filter((task) => task.day === day);

  if (!ready) return null;

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame pageEnter">
        <Link className="backLink" href="/journey">← 回到地图</Link>
        <p className="eyebrow">MAIN QUEST BOARD</p>
        <h1 className="bubbleTitle">DAY {day} 主线看板</h1>
        <NpcBubble>今天先看一眼主线。它不是命令，只是把生存刚需拆成能接住的小步骤。</NpcBubble>
        <div className="boardList">
          {dayTasks.map((task) => {
            const status = getTaskStatus(task.id, state);
            const locked = status === "locked";
            return (
              <article className={`boardQuest ${status}`} key={task.id}>
                <div className="boardIcon">{locked ? "☁️" : task.icon}</div>
                <div>
                  <p>{task.suggestedTime ?? "按当天状态安排"}</p>
                  <h2>{locked ? "后续主线暂未解锁" : task.title}</h2>
                  <span>{locked ? "完成前置主线后开启" : task.realTitle}</span>
                </div>
                {locked ? (
                  <button className="ghostButton" type="button" disabled>未解锁</button>
                ) : (
                  <Link className="primaryButton smallButton" href={`/task/${task.id}`}>
                    接取任务
                  </Link>
                )}
              </article>
            );
          })}
        </div>
        <div className="routePrompt">
          <Link className="secondaryButton" href={`/side/${day}`}>今天想先抽支线</Link>
          <Link className="ghostButton" href={`/free/${day}`}>我想自由探索</Link>
        </div>
      </section>
    </main>
  );
}
