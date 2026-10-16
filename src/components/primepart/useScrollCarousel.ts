"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared behaviour for the horizontal rails (brands, testimonials):
 * scroll by exactly one item and keep the edge states in sync so the
 * controls can disable themselves.
 */
export function useScrollCarousel<T extends HTMLElement>() {
  const trackRef = useRef<T>(null);
  const [edges, setEdges] = useState({ prev: false, next: true });

  const readEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setEdges((current) => {
      const next = {
        prev: track.scrollLeft > 4,
        next: track.scrollLeft < maxScroll - 4,
      };
      return current.prev === next.prev && current.next === next.next
        ? current
        : next;
    });
  }, []);

  useEffect(() => {
    readEdges();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(readEdges);
    observer.observe(track);
    window.addEventListener("resize", readEdges);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", readEdges);
    };
  }, [readEdges]);

  const scrollByItem = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | undefined;
    if (!track || !item) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
    track.scrollBy({
      left: direction * (item.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  }, []);

  return { trackRef, edges, readEdges, scrollByItem };
}
