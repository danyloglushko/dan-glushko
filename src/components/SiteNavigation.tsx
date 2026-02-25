import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'pressure', label: 'Pressure' },
  { id: 'invisible-systems', label: 'Systems' },
  { id: 'failure', label: 'Calibration' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'durability', label: 'Durability' },
  { id: 'record', label: 'Record' },
  { id: 'ventures', label: 'Ventures' },
];

const SiteNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sectionEls = sections.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-md' : ''}`}>
      <div className="section-padding flex items-center justify-between h-16">
        <a href="#hero" className="text-gold font-serif text-lg tracking-wide">DG</a>

        <div className="hidden md:flex items-center gap-6">
          {sections.slice(1).map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`font-sans text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                activeSection === s.id ? 'text-gold' : 'text-muted-nav hover:text-cream'
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <a href="#contact"
          className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-nav hover:text-gold transition-colors duration-300">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default SiteNavigation;
