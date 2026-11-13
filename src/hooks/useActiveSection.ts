import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const map = new Map<string, number>();

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          map.set(id, entry.intersectionRatio);
          let best = '';
          let bestRatio = -1;
          map.forEach((ratio, sid) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = sid; }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-10% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [sectionIds]);

  return active;
}
