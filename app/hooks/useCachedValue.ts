import { useEffect, useState } from "react";

/**
 * Runs `read` for `source` and returns its result, tagged with the source it
 * was read for. A new source reads again, and until that read lands the hook
 * returns `empty`: showing the previous source's value would put one board's
 * data on another board's screen. An empty source reads nothing.
 *
 * `read` must be stable (defined at module level), or every render reads again.
 */
export function useCachedValue<T>(
  source: string | undefined,
  read: (source: string) => Promise<T>,
  empty: T,
) {
  const [loaded, setLoaded] = useState<{ source: string; value: T } | null>(
    null,
  );

  useEffect(() => {
    if (!source) return;

    let isCurrent = true;
    read(source).then((value) => {
      if (isCurrent) setLoaded({ source, value });
    });
    return () => {
      isCurrent = false;
    };
  }, [source, read]);

  const isReady = !source || loaded?.source === source;
  const value = source && loaded?.source === source ? loaded.value : empty;

  return { value, isReady, isLoading: !isReady };
}
