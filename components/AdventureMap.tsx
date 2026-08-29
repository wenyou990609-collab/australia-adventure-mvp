import { tasks } from "@/data/tasks";
import { getTaskStatus } from "@/lib/storage";
import type { JourneyState } from "@/types/journey";
import { Character } from "./Character";
import { TaskCard } from "./TaskCard";

export function AdventureMap({ state }: { state: JourneyState }) {
  const currentIndex = tasks.findIndex((task) => task.id === state.currentTaskId);

  return (
    <section className="mapWrap" aria-label="童话冒险地图">
      <div className="cloudRow">☁️  ☁️  ☁️</div>
      <div className="mapPath" />
      <div className="characterOnPath" style={{ top: `${Math.max(7, currentIndex * 146 + 42)}px` }}>
        <Character compact />
      </div>
      <div className="nodes">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} status={getTaskStatus(task.id, state)} />
        ))}
      </div>
    </section>
  );
}
