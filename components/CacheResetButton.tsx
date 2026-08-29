"use client";

import { useRouter } from "next/navigation";
import { resetJourney } from "@/lib/storage";

export function CacheResetButton() {
  const router = useRouter();

  function handleReset() {
    resetJourney();
    router.push("/");
    router.refresh();
  }

  return (
    <button className="cacheResetButton" type="button" onClick={handleReset} aria-label="清空测试缓存并回到初始状态">
      <span aria-hidden="true">↺</span>
      清空缓存
    </button>
  );
}
