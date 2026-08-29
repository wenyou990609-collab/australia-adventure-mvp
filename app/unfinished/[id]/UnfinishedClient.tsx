"use client";

import Link from "next/link";
import { tasks } from "@/data/tasks";

export default function UnfinishedPage({ id }: { id: number }) {
  const task = tasks.find((item) => item.id === id);

  if (!task) return null;

  return (
    <main className="screen night">
      <div className="texture" />
      <section className="mobileFrame centered pageEnter">
        <div className="moonBadge">🌙</div>
        <h1 className="bubbleTitle">今天没有完成也没关系。</h1>
        <div className="storyText">
          <p>刚到一个陌生国家的时候，事情经常不会按照计划发生。</p>
          <p>也许银行关门了。也许手机卡没有办下来。也许今天只是有点累。</p>
          <p>这个任务不会消失。</p>
          <p>它会在这里等你。</p>
        </div>
        <div className="actionStack">
          <Link className="primaryButton" href="/journey">明天继续</Link>
          <Link className="secondaryButton" href={`/task/${task.id}`}>返回任务</Link>
        </div>
      </section>
    </main>
  );
}
