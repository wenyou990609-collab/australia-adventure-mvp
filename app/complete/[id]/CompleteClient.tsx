"use client";

import { useRouter } from "next/navigation";
import { CompletionAnimation } from "@/components/CompletionAnimation";
import { tasks } from "@/data/tasks";
import { markCompletionSeen } from "@/lib/storage";
import { useJourney } from "@/components/useJourney";

export default function CompletePage({ id }: { id: number }) {
  const router = useRouter();
  const { state, ready } = useJourney();
  const task = tasks.find((item) => item.id === id);

  if (!ready || !task) return null;

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame centered pageEnter">
        <CompletionAnimation task={task} />
        <p className="eyebrow">任务完成</p>
        <h1 className="bubbleTitle">{task.title}</h1>
        <p className="unlockText">{task.unlockText}</p>
        <p className="nodeText">{task.nodeText}</p>
        <blockquote className="completionQuote">{task.completionText}</blockquote>
        <div className="actionStack">
          <button
            className="primaryButton"
            type="button"
            onClick={() => {
              markCompletionSeen(task.id, state);
              router.push(`/photo/${task.day}`);
            }}
          >
            留下今天的照片
          </button>
          <button
            className="secondaryButton"
            type="button"
            onClick={() => {
              markCompletionSeen(task.id, state);
              router.push(`/reflection/${task.day}`);
            }}
          >
            今天先不留
          </button>
        </div>
      </section>
    </main>
  );
}
