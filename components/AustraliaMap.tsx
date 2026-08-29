import Link from "next/link";
import { tasks } from "@/data/tasks";
import { getCurrentDay } from "@/lib/storage";
import type { JourneyState } from "@/types/journey";

export function AustraliaMap({ state }: { state: JourneyState }) {
  const currentDay = getCurrentDay(state);

  return (
    <section className="australiaMap" aria-label="7日澳洲冒险地图">
      <div className="cityTabs">
        <span>悉尼 Sydney</span>
        <span>墨尔本 Melbourne</span>
      </div>
      <div className="dayRail">
        {Array.from({ length: 7 }, (_, index) => index + 1).map((day) => {
          const dayTasks = tasks.filter((task) => task.day === day);
          const finished = dayTasks.every((task) => state.completedTaskIds.includes(task.id));
          const active = day === currentDay;
          const available = day <= currentDay || finished;
          return (
            <Link
              key={day}
              href={available ? `/day/${day}` : "/journey"}
              className={`dayStop ${finished ? "finished" : active ? "active" : available ? "open" : "mist"}`}
              aria-disabled={!available}
            >
              <span>DAY {day}</span>
              <strong>{finished ? "已完成" : active ? "今日据点" : available ? "可回看" : "未解锁"}</strong>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
