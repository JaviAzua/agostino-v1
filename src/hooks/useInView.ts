import { useState, useEffect } from "react";

const useInView = (
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
};

export default useInView;
