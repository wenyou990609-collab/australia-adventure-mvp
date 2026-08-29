import Link from "next/link";
import type { TaskStatus } from "@/types/journey";
import type { Task } from "@/types/journey";

export function TaskCard({ task, status }: { task: Task; status: TaskStatus }) {
  const locked = status === "locked";
  const label = status === "completed" ? "已点亮" : status === "delayed" ? "等你回来" : status === "available" ? "CURRENT" : "LOCKED";
  const body = (
    <article className={`mapNode ${status}`}>
      <div className="nodeIcon" aria-hidden="true">{locked ? "☁️" : task.icon}</div>
      <div className="nodeCopy">
        <p>DAY {task.day}</p>
        <h2>{locked ? "???" : task.title}</h2>
        <span>{label}</span>
      </div>
    </article>
  );

  if (status === "available" || status === "completed" || status === "delayed") {
    return <Link className="nodeLink" href={`/task/${task.id}`}>{body}</Link>;
  }

  return <div className="nodeLink disabled" aria-disabled="true">{body}</div>;
}
