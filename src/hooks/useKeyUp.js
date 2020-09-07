import { useEffect } from "react";

const useKeyUp = (onKeyUp, key) => {
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (!key || e.key === key) {
        onKeyUp();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  });
};

export default useKeyUp;
