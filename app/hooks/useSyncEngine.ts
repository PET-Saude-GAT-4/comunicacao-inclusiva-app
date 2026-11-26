import { useContext } from "react";

import { SyncContext } from "@/contexts/SyncContext";

export function useSyncEngine() {
  const context = useContext(SyncContext);

  if (!context || context.isSyncing === undefined) {
    throw new Error("useSyncEngine must be used within a SyncProvider");
  }

  return context;
}
