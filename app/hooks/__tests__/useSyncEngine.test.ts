import { act, renderHook, waitFor } from "@testing-library/react-native";

import { SyncProvider } from "@/contexts/SyncContext";
import { useSyncEngine } from "@/hooks/useSyncEngine";
import { syncService } from "@/services/syncService";

jest.mock("@/services/syncService", () => ({
  syncService: { syncAll: jest.fn() },
}));

const syncAll = syncService.syncAll as jest.Mock;

describe("useSyncEngine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws when used outside a SyncProvider", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    await expect(renderHook(() => useSyncEngine())).rejects.toThrow(
      "useSyncEngine must be used within a SyncProvider",
    );
    spy.mockRestore();
  });

  it("syncs once on mount and reports success", async () => {
    syncAll.mockResolvedValue(true);

    const { result } = await renderHook(() => useSyncEngine(), {
      wrapper: SyncProvider,
    });

    await waitFor(() => expect(result.current.isSyncing).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.syncVersion).toBe(1);
    expect(syncAll).toHaveBeenCalledTimes(1);
  });

  it("reports an error when the sync fails", async () => {
    syncAll.mockResolvedValue(false);

    const { result } = await renderHook(() => useSyncEngine(), {
      wrapper: SyncProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isSyncing).toBe(false);
    expect(result.current.syncVersion).toBe(1);
  });

  it("reports an error when the sync throws", async () => {
    syncAll.mockRejectedValue(new Error("offline"));

    const { result } = await renderHook(() => useSyncEngine(), {
      wrapper: SyncProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isSyncing).toBe(false);
    expect(result.current.syncVersion).toBe(1);
  });

  it("increments syncVersion and resets error when triggerSync is called", async () => {
    syncAll.mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    const { result } = await renderHook(() => useSyncEngine(), {
      wrapper: SyncProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.syncVersion).toBe(1);

    await act(async () => {
      await result.current.triggerSync();
    });

    await waitFor(() => expect(result.current.isSyncing).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.syncVersion).toBe(2);
    expect(syncAll).toHaveBeenCalledTimes(2);
  });
});
