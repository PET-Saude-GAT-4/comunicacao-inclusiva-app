import { useEffect, useState } from "react";

export function useCiProbe() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(1);
  }, []);
  return value;
}
