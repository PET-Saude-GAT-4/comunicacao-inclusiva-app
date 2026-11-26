import { act, renderHook, waitFor } from "@testing-library/react-native";
import React from "react";

import { SyncContext } from "@/contexts/SyncContext";
import { useCachedValue } from "@/hooks/useCachedValue";

function deferredRead() {
  const pending = new Map<string, (value: string) => void>();
  const read = jest.fn(
    (source: string) =>
      new Promise<string>((resolve) => pending.set(source, resolve)),
  );
  const resolve = async (source: string, value: string) => {
    await act(async () => pending.get(source)?.(value));
  };
  return { read, resolve };
}

describe("useCachedValue", () => {
  it("returns what the read produced for the source", async () => {
    const read = jest.fn(async (source: string) => `value of ${source}`);

    const { result } = await renderHook(() =>
      useCachedValue("board-1", read, ""),
    );

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.value).toBe("value of board-1");
    expect(result.current.isLoading).toBe(false);
    expect(read).toHaveBeenCalledWith("board-1");
  });

  it("reports loading and returns the empty value until the read lands", async () => {
    const { read, resolve } = deferredRead();

    const { result } = await renderHook(() =>
      useCachedValue("board-1", read, "empty"),
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isReady).toBe(false);
    expect(result.current.value).toBe("empty");

    await resolve("board-1", "loaded");

    expect(result.current.isLoading).toBe(false);
    expect(result.current.value).toBe("loaded");
  });

  it("hides the previous source's value while the new one loads", async () => {
    const { read, resolve } = deferredRead();

    const { result, rerender } = await renderHook(
      ({ source }: { source: string }) => useCachedValue(source, read, "empty"),
      { initialProps: { source: "board-1" } },
    );
    await resolve("board-1", "first");

    await rerender({ source: "board-2" });

    expect(result.current.value).toBe("empty");
    expect(result.current.isLoading).toBe(true);

    await resolve("board-2", "second");

    expect(result.current.value).toBe("second");
  });

  it("drops a read that lands after the source changed", async () => {
    const { read, resolve } = deferredRead();

    const { result, rerender } = await renderHook(
      ({ source }: { source: string }) => useCachedValue(source, read, "empty"),
      { initialProps: { source: "board-1" } },
    );
    await rerender({ source: "board-2" });
    await resolve("board-2", "second");

    await resolve("board-1", "first");

    expect(result.current.value).toBe("second");
  });

  it("reads nothing and is ready at once when there is no source", async () => {
    const read = jest.fn(async () => "never");

    const { result } = await renderHook(() =>
      useCachedValue(undefined, read, "empty"),
    );

    expect(result.current.isReady).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.value).toBe("empty");
    expect(read).not.toHaveBeenCalled();
  });

  it("re-runs the read when syncVersion changes without clearing the current value", async () => {
    let version = 1;
    const read = jest.fn(
      async (source: string) => `version ${version} of ${source}`,
    );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SyncContext.Provider
        value={{
          isSyncing: false,
          isError: false,
          syncVersion: version,
          triggerSync: jest.fn(),
        }}
      >
        {children}
      </SyncContext.Provider>
    );

    const { result, rerender } = await renderHook(
      () => useCachedValue("board-1", read, "empty"),
      { wrapper },
    );

    await waitFor(() =>
      expect(result.current.value).toBe("version 1 of board-1"),
    );

    version = 2;
    await rerender({});

    await waitFor(() =>
      expect(result.current.value).toBe("version 2 of board-1"),
    );
    expect(read).toHaveBeenCalledTimes(2);
  });
});
