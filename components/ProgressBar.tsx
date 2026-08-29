import { tasks } from "@/data/tasks";
import { getCurrentDay } from "@/lib/storage";
import type { JourneyState } from "@/types/journey";

export function ProgressBar({ state }: { state: JourneyState }) {
  const completed = state.completedTaskIds.length;
  const percent = Math.round((completed / tasks.length) * 100);
  const currentDay = getCurrentDay(state);

  return (
    <section className="topPanel" aria-label="冒险进度">
      <div>
        <p className="eyebrow">Australia Starter Adventure</p>
        <h1 className="bubbleTitle">澳洲大冒险</h1>
        <p className="subtitle">DAY {currentDay} / 7 · 悉尼 / 墨尔本落地助手</p>
      </div>
      <div className="progressShell" aria-label={`${completed} / ${tasks.length} 个节点完成`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <p className="progressText">{completed} / {tasks.length} 个节点完成</p>
    </section>
  );
}
