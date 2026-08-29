"use client";

import type { Mood } from "@/types/journey";

const moods: Array<{ value: Mood; label: string; note: string }> = [
  { value: "good", label: "🙂 还不错", note: "看起来这座城市今天对你还算友好。" },
  { value: "tired", label: "😐 有点累", note: "第一个星期本来就会消耗很多精力。今天已经结束了。" },
  { value: "hard", label: "🥲 今天有点难", note: "有些日子只要平安结束，就已经完成了今天的任务。" }
];

export function moodNote(mood?: Mood) {
  return moods.find((item) => item.value === mood)?.note;
}

export function MoodSelector({ value, onChange }: { value?: Mood; onChange: (mood: Mood) => void }) {
  return (
    <div className="moodGrid" role="radiogroup" aria-label="今天过得怎么样">
      {moods.map((mood) => (
        <button
          key={mood.value}
          type="button"
          className={value === mood.value ? "mood active" : "mood"}
          onClick={() => onChange(mood.value)}
          role="radio"
          aria-checked={value === mood.value}
        >
          <strong>{mood.label}</strong>
          <span>{mood.note}</span>
        </button>
      ))}
    </div>
  );
}
