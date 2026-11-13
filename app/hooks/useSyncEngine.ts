import { useEffect, useState } from "react";

import { syncService } from "@/services/syncService";

export function useSyncEngine() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isError, setIsError] = useState(false);

  const triggerSync = async () => {
    setIsSyncing(true);
    setIsError(false);
    const success = await syncService.syncAll();
    setIsError(!success);
    setIsSyncing(false);
  };

  useEffect(() => {
    // Silently triggers sync every time the app opens
    triggerSync();
  }, []);

  return { isSyncing, isError, triggerSync };
}
