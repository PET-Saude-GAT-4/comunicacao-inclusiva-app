import { MyCollectionContext } from "@/contexts/MyCollectionContext";
import { useContext } from "react";

export function useMyCollection() {
  const context = useContext(MyCollectionContext);

  if (!context) {
    throw new Error(
      "useMyCollection must be used within a MyCollectionProvider",
    );
  }

  return context;
}
