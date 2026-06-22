'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/extract-headings';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: [0.1, 0.3, 0.5, 0.8],
    });

    const nodes = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];

    nodes.forEach((node) => observer.observe(node));

    return () => {
      nodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);

    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[6rem] hidden max-h-[calc(100vh-6rem)] overflow-auto rounded-3xl border border-border/60 bg-background/90 p-5 shadow-sm backdrop-blur-sm lg:block"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        On this page
      </p>

      <ol className="space-y-2">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li
              key={heading.id}
              className={`rounded-xl border-l-2 px-3 py-2 transition-colors duration-200 ${
                isActive
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground'
              } ${heading.level === 3 ? 'ml-4' : ''}`}
            >
              <button
                type="button"
                onClick={() => handleClick(heading.id)}
                className="w-full text-left text-sm font-medium"
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
