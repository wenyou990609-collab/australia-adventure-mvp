"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { tasks } from "@/data/tasks";
import { completeTask, delayTask, getTaskStatus } from "@/lib/storage";
import { useJourney } from "@/components/useJourney";

export default function TaskPage({ id }: { id: number }) {
  const router = useRouter();
  const { state, ready } = useJourney();
  const task = tasks.find((item) => item.id === id);

  if (!ready || !task) return null;

  const status = getTaskStatus(task.id, state);
  const canAct = status === "available" || status === "delayed";

  return (
    <main className="screen">
      <div className="texture" />
      <article className="mobileFrame taskPage pageEnter">
        <Link className="backLink" href="/journey">← 回到地图</Link>
        <p className="eyebrow">DAY {task.day}</p>
        <h1 className="bubbleTitle">{task.title}</h1>
        <div className="taskIllustration" aria-label={`${task.title} 插画`} role="img">
          <span>{task.icon}</span>
          <i />
        </div>
        <section className="paperPanel">
          <h2>今天的任务</h2>
          <p className="bigLine">{task.realTitle}</p>
          <p>{task.description}</p>
        </section>
        {task.suggestedTime ? (
          <section className="softSection compactInfo">
            <h2>建议预留时间</h2>
            <p>{task.suggestedTime}</p>
          </section>
        ) : null}
        <section className="softSection">
          <h2>为什么要做这件事？</h2>
          <p>{task.why}</p>
        </section>
        {task.steps ? (
          <section className="softSection">
            <h2>建议流程</h2>
            <ol className="stepList">
              {task.steps.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
        ) : null}
        {task.preparation ? (
          <section className="softSection">
            <h2>准备这些</h2>
            <ul className="checkList">
              {task.preparation.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ) : null}
        {task.challenge ? (
          <section className="softSection">
            <h2>今日探索</h2>
            <ul className="checkList">
              {task.challenge.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ) : null}
        {status === "completed" ? (
          <div className="notice">这个节点已经点亮了。你可以回来看看当时完成了什么。</div>
        ) : (
          <div className="actionStack">
            <button
              className="primaryButton"
              type="button"
              disabled={!canAct}
              onClick={() => {
                completeTask(task.id, state);
                router.push(`/complete/${task.id}`);
              }}
            >
              {task.id === 4 ? "今晚安全结束" : "我完成了"}
            </button>
            <button
              className="secondaryButton"
              type="button"
              disabled={!canAct}
              onClick={() => {
                delayTask(task.id, state);
                router.push(`/unfinished/${task.id}`);
              }}
            >
              今天还没完成
            </button>
          </div>
        )}
      </article>
    </main>
  );
}
