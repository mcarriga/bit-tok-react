import { useEffect, useState, useMemo } from "react";

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const options = {
    threshold:0.9
  }

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting), options
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

export default useIsInViewport;