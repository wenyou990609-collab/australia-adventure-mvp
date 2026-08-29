"use client";

import Link from "next/link";
import { Character } from "@/components/Character";
import { useJourney } from "@/components/useJourney";

const firsts = ["独自落地", "找到住处", "建立通讯", "度过第一个夜晚", "建立银行账户", "完成本地消费", "独自逛超市", "独自在城市里吃饭"];

export default function FinalPage() {
  const { state, ready } = useJourney();
  const photoCount = state.days.filter((day) => day.photo).length;

  if (!ready) return null;

  return (
    <main className="screen celebration">
      <div className="texture" />
      <section className="mobileFrame finalPage pageEnter">
        <p className="eyebrow">DAY 7</p>
        <h1 className="bubbleTitle">第一周完成</h1>
        <Character />
        <div className="summaryBand">
          <strong>7 DAYS</strong>
          <span>8 个新生活节点</span>
          <span>{photoCount} 张生活照片</span>
        </div>
        <section className="softSection">
          <h2>第一次</h2>
          <ul className="checkList done">
            {firsts.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <blockquote className="finalWords">
          七天前，<br />
          这里还是一个完全陌生的地方。<br /><br />
          现在你已经知道：在哪里睡觉，怎样联系别人，怎样付款，去哪里买东西，怎样让自己吃上一顿饭。<br /><br />
          这些事情看起来都很小。<br />
          但一座陌生城市，就是这样一点一点变成生活的。
        </blockquote>
        <h2 className="clearTitle">新手村通关</h2>
        <div className="actionStack">
          <Link className="primaryButton" href="/memories">查看 7 日回忆录</Link>
          <Link className="secondaryButton" href="/journey">回到地图</Link>
        </div>
      </section>
    </main>
  );
}
