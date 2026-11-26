import { createContext, ReactNode, useEffect, useState } from "react";

import { syncService } from "@/services/syncService";

export interface SyncContextData {
  isSyncing: boolean;
  isError: boolean;
  // Bumped after every sync, so cache readers know to read again.
  syncVersion: number;
  triggerSync: () => Promise<void>;
}

export const SyncContext = createContext({} as SyncContextData);

interface Props {
  children: ReactNode;
}

export function SyncProvider({ children }: Props) {
  // The sync starts on mount, so the provider is syncing from its first render.
  const [isSyncing, setIsSyncing] = useState(true);
  const [isError, setIsError] = useState(false);
  const [syncVersion, setSyncVersion] = useState(0);

  const finish = (success: boolean) => {
    setIsError(!success);
    setIsSyncing(false);
    // Bumped even on failure: a partial sync may still have written some keys.
    setSyncVersion((version) => version + 1);
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

  return (
    <SyncContext.Provider
      value={{ isSyncing, isError, syncVersion, triggerSync }}
    >
      {children}
    </SyncContext.Provider>
  );
}
