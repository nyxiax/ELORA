"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** Avoid hydration mismatch for localStorage-backed UI */
export function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
