import { useRef } from "react";

export function useHorizontalScroll(scrollAmount = 320) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft -= scrollAmount;
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft += scrollAmount;
  };

  return {
    scrollRef,
    scrollLeft,
    scrollRight,
  };
}