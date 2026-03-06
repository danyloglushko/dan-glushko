import useScrollReveal from '../hooks/useScrollReveal';

interface RecordItem {
  text: string;
}

interface RecordCategory {
  label: string;
  items: RecordItem[];
}

interface Publication {
  title: string;
  venue: string;
}

const categories: RecordCategory[] = [
  {
    label: 'Engineering Record',
    items: [
      { text: '12+ years chemical enhanced oil recovery engineering' },
      { text: '150+ laboratory coreflood experiments executed' },
      { text: '50+ tertiary recovery system designs evaluated' },
      { text: 'SPE technical publications and international research programs' },
      { text: 'Contributions to field pilot programs in the Middle East' },
    ],
  },
  {
    label: 'Systems and Architecture',
    items: [
      { text: 'AI workflow engineering and deployment' },
      { text: 'LLM agent systems, designed and operated' },
      { text: 'Revenue automation infrastructure' },
      { text: 'Blockchain architecture since 2018' },
    ],
  },
  {
    label: 'Entrepreneurship',
    items: [
      { text: 'Founded and operated marketplace ecommerce' },
      { text: 'Acquired and rebuilt Okana (DTC brand)' },
      { text: 'Migrated infrastructure and redesigned front end' },
      { text: 'Integrated operational automation end to end' },
    ],
  },
];

const publications: Publication[] = [
  {
    title: 'Conditioning Polymer Solutions for Injection into Tight Reservoir Rocks',
    venue: 'SPE Improved Oil Recovery Conference — Tulsa',
  },
  {
    title: 'Low Salinity Polymer Flooding in a High Temperature Low Permeability Carbonate Reservoir in West Kuwait',
    venue: 'SPE Kuwait Oil & Gas Show',
  },
  {
    title: 'Improving ASP Performance in Carbonate Reservoir Rocks Using Hybrid Alkali',
    venue: 'SPE Annual Technical Conference',
  },
  {
    title: 'Selection of a Chemical EOR Strategy in a Heavy Oil Reservoir Using Laboratory Data and Reservoir Simulation',
    venue: 'SPE Canada Heavy Oil Technical Conference',
  },
  {
    title: 'Innovative ASP Formulation Strategies for Multi Field Applications and Enhanced Economic Feasibility',
    venue: 'SPE Improved Oil Recovery Symposium',
  },
];

const TechnicalRecordSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="record" className="section-margin section-padding grain-overlay" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <span className="chapter-label">Technical Record</span>
          <div className="divider-gold mt-4 mb-6" />
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-cream">
            Operating History
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-px bg-border/20" style={{ transitionDelay: '0.15s' }}>
          {categories.map((cat, ci) => (
            <div key={ci} className="bg-background p-8 md:p-10">
              <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-8">
                {cat.label}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0" />
                    <span className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Research & Publications */}
        <div className="reveal mt-20" style={{ transitionDelay: '0.3s' }}>
          <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-8">
            Technical Research and Publications
          </h3>
          <div className="prose-editorial space-y-5 max-w-3xl">
            <p>
              Dan Glushko has contributed to multiple Society of Petroleum Engineers (SPE) technical publications and international research programs focused on chemical enhanced oil recovery, polymer flooding, and ASP system design.
            </p>
            <p>
              His work has included laboratory design and validation of ASP, surfactant polymer, and polymer flooding systems for complex carbonate and sandstone reservoirs.
            </p>
            <p>
              Over the course of his engineering career he has executed more than 150 laboratory coreflood experiments used to validate chemical recovery models, optimize surfactant formulations, and support field pilot deployments.
            </p>
            <p>
              These studies have contributed to chemical EOR programs implemented across multiple international oil operators, including projects in Kuwait and the Middle East.
            </p>
          </div>
        </div>

        {/* Selected Technical Publications */}
        <div className="reveal mt-16" style={{ transitionDelay: '0.45s' }}>
          <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
            Selected SPE Technical Publications
          </h3>
          <p className="font-sans text-xs text-muted-foreground mb-8 max-w-2xl">
            Selected technical publications presented through the Society of Petroleum Engineers (SPE).
          </p>
          <div className="space-y-px">
            {publications.map((pub, i) => (
              <div
                key={i}
                className="bg-background border-l-2 border-gold/20 pl-6 py-5 pr-6 hover:border-gold/50 transition-colors"
              >
                <p className="font-sans text-sm text-cream leading-relaxed">
                  {pub.title}
                </p>
                <p className="font-sans text-[11px] text-muted-foreground mt-1 tracking-wide">
                  {pub.venue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalRecordSection;
