import type { Task } from "@/types/journey";
import { Character } from "./Character";

export function CompletionAnimation({ task }: { task: Task }) {
  return (
    <div className="completionStage" aria-label="任务完成动画">
      <div className="star s1">✦</div>
      <div className="star s2">✧</div>
      <div className="star s3">✦</div>
      <Character />
      <div className="litNode">{task.icon}</div>
    </div>
  );
}
