import { tasks } from "@/data/tasks";
import { moodNote } from "./MoodSelector";
import type { JourneyState } from "@/types/journey";

export function MemoryTimeline({ state }: { state: JourneyState }) {
  return (
    <div className="memoryTimeline">
      {state.days.map((day) => {
        const dayTasks = tasks.filter((task) => task.day === day.day);
        const title = dayTasks.map((task) => task.title).join(" / ");
        const quote = dayTasks[dayTasks.length - 1].completionText.split("\n")[0];
        return (
          <article className="memoryItem" key={day.day}>
            <p>DAY {day.day}</p>
            <h2>{title}</h2>
            {day.photo ? <img src={day.photo} alt={`DAY ${day.day} 的照片`} /> : <div className="photoPlaceholder">那天没有留下照片</div>}
            <blockquote>“{quote}”</blockquote>
            {day.mood ? <span className="moodLine">{moodNote(day.mood)}</span> : null}
          </article>
        );
      })}
    </div>
  );
}

export function ShareCard() {
  return (
    <section className="shareCard" aria-label="适合截图分享的总结卡">
      <p>MY FIRST WEEK ABROAD</p>
      <h2>我的留学新手村</h2>
      <div className="shareStats">
        <strong>7 DAYS</strong>
        <strong>8 MISSIONS</strong>
      </div>
      <div className="shareIcons">✈️ 🏠 📱 🌙 🏦 💳 🛒 🍜</div>
      <h3>新手村通关</h3>
      <blockquote>“这里已经开始变成我的生活。”</blockquote>
      <div className="tinyCat">ᓚᘏᗢ</div>
    </section>
  );
}
