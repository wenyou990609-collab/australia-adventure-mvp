import Link from "next/link";
import { tasks } from "@/data/tasks";
import type { JourneyState } from "@/types/journey";

export function ModePicker({ day, state }: { day: number; state: JourneyState }) {
  const dayTasks = tasks.filter((task) => task.day === day);
  const completedCount = dayTasks.filter((task) => state.completedTaskIds.includes(task.id)).length;
  const record = state.days.find((item) => item.day === day);

  return (
    <section className="modeGrid" aria-label={`DAY ${day} 任务选择`}>
      <Link className="modeCard main" href={`/main/${day}`}>
        <span>🧭</span>
        <div>
          <h2>主线任务</h2>
          <p>生存刚需与关键第一次体验</p>
          <strong>{completedCount} / {dayTasks.length} 已完成</strong>
        </div>
      </Link>
      <Link className="modeCard side" href={`/side/${day}`}>
        <span>🎲</span>
        <div>
          <h2>支线抽奖</h2>
          <p>今天想探索什么，由事件卡决定</p>
          <strong>{record?.selectedSideEventId ? "已选择" : "3 次刷新机会"}</strong>
        </div>
      </Link>
      <Link className="modeCard free" href={`/free/${day}`}>
        <span>🌤️</span>
        <div>
          <h2>自由探索</h2>
          <p>不推进任务，也允许下班</p>
          <strong>{record?.freeExplored ? "今天已下班" : "低压力入口"}</strong>
        </div>
      </Link>
    </section>
  );
}
