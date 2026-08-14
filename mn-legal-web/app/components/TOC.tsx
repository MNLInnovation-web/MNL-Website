'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;

    const elements = Array.from(articleBody.querySelectorAll('h2, h3')) as HTMLElement[];
    const headingData = elements.map((el, i) => {
      if (!el.id) {
        el.id = `section-${i}`;
      }
      return {
        id: el.id,
        text: el.innerText,
        level: parseInt(el.tagName.replace('H', '')),
      };
    });

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    elements.forEach((el: any) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="bg-[var(--mn-cream)] border-l-4 border-l-[var(--mn-burgundy)] p-8">
      <span className="block text-[10px] uppercase tracking-[2.5px] text-[var(--mn-burgundy)] font-bold mb-6">Contents</span>
      <ul className="space-y-4">
        {headings.map((heading: any) => (          <li 
            key={heading.id} 
            className={`${heading.level === 3 ? 'ml-4' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              className={`text-[13px] transition-colors duration-300 hover:text-[var(--mn-burgundy)] ${
                activeId === heading.id 
                  ? 'text-[var(--mn-burgundy)] font-bold' 
                  : 'text-[var(--text-secondary)]'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
