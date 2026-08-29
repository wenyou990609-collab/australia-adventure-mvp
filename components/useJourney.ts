"use client";

import { useEffect, useState } from "react";
import { createInitialJourney, loadJourney } from "@/lib/storage";
import type { JourneyState } from "@/types/journey";

export function useJourney() {
  const [state, setState] = useState<JourneyState>(createInitialJourney());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setState(loadJourney());
    refresh();
    setReady(true);
    window.addEventListener("starter-village-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("starter-village-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return { state, ready, refresh: () => setState(loadJourney()) };
}
