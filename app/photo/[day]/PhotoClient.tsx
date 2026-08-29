"use client";

import { useRouter } from "next/navigation";
import { PhotoUploader } from "@/components/PhotoUploader";
import { useJourney } from "@/components/useJourney";
import { savePhoto } from "@/lib/storage";

export default function PhotoPage({ day }: { day: number }) {
  const router = useRouter();
  const { state, ready } = useJourney();
  const record = state.days.find((item) => item.day === day);

  if (!ready || !record) return null;

  return (
    <main className="screen">
      <div className="texture" />
      <section className="mobileFrame centered pageEnter">
        <div className="cameraBadge">📷</div>
        <p className="eyebrow">DAY {day}</p>
        <h1 className="bubbleTitle">为今天留下一张照片</h1>
        <div className="storyText">
          <p>不一定要拍得好看。</p>
          <p>以后你可能会想看看，刚刚来到这里的自己，那天看到了什么。</p>
        </div>
        <PhotoUploader value={record.photo} onChange={(photo) => savePhoto(day, photo, state)} />
        <div className="actionStack">
          <button className="primaryButton" type="button" onClick={() => router.push(`/reflection/${day}`)}>
            继续
          </button>
          <button className="secondaryButton" type="button" onClick={() => router.push(`/reflection/${day}`)}>
            今天先不留
          </button>
        </div>
      </section>
    </main>
  );
}
