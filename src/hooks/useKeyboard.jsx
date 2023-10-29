import { useEffect } from "react";

export const useKeyboard = (callback) => {
  useEffect(() => {
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, [callback]);
};
