import useScrollReveal from '../hooks/useScrollReveal';

const systems = [
  {
    title: 'Chemical EOR Recovery Systems',
    description: 'Design and laboratory validation of polymer, surfactant, and ASP flooding systems for complex oil reservoirs.',
  },
  {
    title: 'Autonomous AI Workflow Systems',
    description: 'Architecture of automation systems using AI agents, APIs, and workflow orchestration.',
  },
  {
    title: 'Direct to Consumer Brand Operations',
    description: 'Operational, product, and supply chain systems developed through Okana.',
  },
  {
    title: 'Blockchain and Digital Financial Systems',
    description: 'Exploration and application of decentralized financial systems beginning in 2018.',
  },
];

const SystemsBuiltSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="systems-built" className="section-margin section-padding grain-overlay" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <span className="chapter-label">Systems Built</span>
          <div className="divider-gold mt-4 mb-6" />
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-cream">
            Systems Built
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20" style={{ transitionDelay: '0.15s' }}>
          {systems.map((sys, i) => (
            <div key={i} className="bg-background p-8 md:p-10">
              <h3 className="font-serif text-lg md:text-xl text-cream italic mb-3">
                {sys.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {sys.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemsBuiltSection;
