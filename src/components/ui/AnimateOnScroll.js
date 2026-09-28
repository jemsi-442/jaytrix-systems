"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AnimateOnScroll({
  children,
  animation = "animate-fade-in-up",
  delay = 0,
  threshold = 0.1,
  className,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerReady, setObserverReady] = useState(false);

  useEffect(() => {
    const current = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!current || reducedMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(current);
    setObserverReady(true);
    return () => observer.unobserve(current);
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        observerReady && !isVisible ? "opacity-0 translate-y-8" : isVisible ? animation : "",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
