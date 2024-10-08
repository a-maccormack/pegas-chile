import { useCallback, useEffect, useState, useRef } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  root?: HTMLElement | null;
  totalPages: number;
  loading: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  threshold = 0.1,
  rootMargin = "20px",
  root = null,
  totalPages,
  loading,
  onLoadMore,
}: UseInfiniteScrollOptions) => {
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
        onLoadMore();
      }
    },
    [loading, page, totalPages, onLoadMore],
  );

  useEffect(() => {
    const observerOptions = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver, root, rootMargin, threshold]);

  return { page, loadMoreRef };
};
