"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ProductCard from "./ProductCard";
import { products } from "./products-data";

export type CarouselHandle = {
  scrollByCard: (direction: 1 | -1) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type ProductCarouselProps = {
  onEdgesChange?: (edges: { prev: boolean; next: boolean }) => void;
};

/**
 * A real horizontal scroller: 4 cards on desktop, 2 on tablet, ~1.15 on
 * phones. Prev/next scroll by exactly one card + gap, measured from the
 * rendered items so it stays correct across breakpoints.
 */
const ProductCarousel = forwardRef<CarouselHandle, ProductCarouselProps>(
  function ProductCarousel({ onEdgesChange }, ref) {
    const trackRef = useRef<HTMLUListElement>(null);
    const [edges, setEdges] = useState({ prev: false, next: true });

    const readEdges = useCallback(() => {
      const track = trackRef.current;
      if (!track) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = {
        prev: track.scrollLeft > 4,
        next: track.scrollLeft < maxScroll - 4,
      };
      setEdges((current) =>
        current.prev === next.prev && current.next === next.next
          ? current
          : next,
      );
      onEdgesChange?.(next);
    }, [onEdgesChange]);

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

    const scrollByCard = useCallback((direction: 1 | -1) => {
      const track = trackRef.current;
      const card = track?.firstElementChild as HTMLElement | undefined;
      if (!track || !card) return;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
      track.scrollBy({
        left: direction * (card.getBoundingClientRect().width + gap),
        behavior: "smooth",
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        scrollByCard,
        canScrollPrev: edges.prev,
        canScrollNext: edges.next,
      }),
      [scrollByCard, edges],
    );

    return (
      <ul
        ref={trackRef}
        onScroll={readEdges}
        className="-mx-1 flex min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-1 pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <li
            key={product.title}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] xl:w-[calc(25%-18px)]"
          >
            <ProductCard
              product={product}
              index={index}
              priority={index === 0}
            />
          </li>
        ))}
      </ul>
    );
  },
);

export default ProductCarousel;
