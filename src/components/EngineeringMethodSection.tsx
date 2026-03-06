import useScrollReveal from '../hooks/useScrollReveal';

const principles = [
  'Observe the system before attempting to change it.',
  'Identify the constraints that limit performance.',
  'Engineer feedback loops that stabilize the system.',
  'Reduce unnecessary human intervention wherever possible.',
  'Design systems that remain functional under pressure.',
];

const EngineeringMethodSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="method" className="section-margin section-padding grain-overlay" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <span className="chapter-label">Engineering Method</span>
          <div className="divider-gold mt-4 mb-6" />
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-cream">
            Approach
          </h2>
        </div>

        <div className="reveal max-w-3xl" style={{ transitionDelay: '0.15s' }}>
          <ol className="space-y-6 list-none counter-reset-method">
            {principles.map((p, i) => (
              <li key={i} className="flex items-start gap-5">
                <span className="font-sans text-[11px] tracking-[0.2em] text-gold mt-1 shrink-0 w-6 text-right">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {p}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EngineeringMethodSection;
