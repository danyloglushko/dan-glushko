import { useEffect, useRef } from 'react';

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const el = ref.current;
    if (el) {
      const children = el.querySelectorAll('.reveal');
      children.forEach((child) => observer.observe(child));
      // Also observe the element itself if it has .reveal
      if (el.classList.contains('reveal')) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useScrollReveal;
