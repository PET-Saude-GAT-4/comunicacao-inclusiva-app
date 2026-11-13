import { renderHook, waitFor } from "@testing-library/react-native";

import { useSyncEngine } from "@/hooks/useSyncEngine";
import { syncService } from "@/services/syncService";

jest.mock("@/services/syncService", () => ({
  syncService: { syncAll: jest.fn() },
}));

const syncAll = syncService.syncAll as jest.Mock;

describe("useSyncEngine", () => {
  it("syncs once on mount and reports success", async () => {
    syncAll.mockResolvedValue(true);

    const { result } = await renderHook(() => useSyncEngine());

    await waitFor(() => expect(result.current.isSyncing).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(syncAll).toHaveBeenCalledTimes(1);
  });

  it("reports an error when the sync fails", async () => {
    syncAll.mockResolvedValue(false);

    const { result } = await renderHook(() => useSyncEngine());

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isSyncing).toBe(false);
  });

  it("reports an error when the sync throws", async () => {
    syncAll.mockRejectedValue(new Error("offline"));

    const { result } = await renderHook(() => useSyncEngine());

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isSyncing).toBe(false);
  });
});
