import { useEffect, useState } from "react";

import { syncService } from "@/services/syncService";

export function useSyncEngine() {
  // The sync starts on mount, so the hook is syncing from its first render.
  const [isSyncing, setIsSyncing] = useState(true);
  const [isError, setIsError] = useState(false);

  const finish = (success: boolean) => {
    setIsError(!success);
    setIsSyncing(false);
  };

  const triggerSync = async () => {
    setIsSyncing(true);
    setIsError(false);
    finish(await syncService.syncAll().catch(() => false));
  };

  useEffect(() => {
    // Silently triggers sync every time the app opens
    syncService
      .syncAll()
      .then(finish)
      .catch(() => finish(false));
  }, []);

  return { isSyncing, isError, triggerSync };
}
