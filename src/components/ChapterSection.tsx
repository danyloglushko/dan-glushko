import { ReactNode } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ChapterSectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

const ChapterSection = ({ id, number, title, children }: ChapterSectionProps) => {
  const ref = useScrollReveal();

  return (
    <section id={id} className="section-margin section-padding grain-overlay" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <span className="chapter-label">Chapter {number}</span>
          <div className="divider-gold mt-4 mb-6" />
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl">{title}</h2>
        </div>
        <div className="reveal" style={{ transitionDelay: '0.15s' }}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ChapterSection;
