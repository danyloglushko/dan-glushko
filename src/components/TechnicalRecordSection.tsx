import useScrollReveal from '../hooks/useScrollReveal';

interface RecordItem {
  text: string;
}

interface RecordCategory {
  label: string;
  items: RecordItem[];
}

const categories: RecordCategory[] = [
  {
    label: 'Engineering Record',
    items: [
      { text: '12+ Years — Executed Tertiary EOR Programs' },
      { text: '50+ Chemical EOR Systems Designed & Validated' },
      { text: 'ASP / SP / Polymer — Lab Through Pilot' },
      { text: '5 SPE Papers — Documented for Reproducibility' },
      { text: 'Kuwait Pilot — Deployed for Field QC' },
    ],
  },
  {
    label: 'Systems & Architecture',
    items: [
      { text: 'AI Workflow Engineering & Deployment' },
      { text: 'LLM Agent Systems — Designed & Operated' },
      { text: 'Revenue Automation Infrastructure' },
      { text: 'Blockchain Architecture Since 2018' },
      
    ],
  },
  {
    label: 'Entrepreneurship',
    items: [
      { text: 'Founded & Operated — Marketplace Ecommerce' },
      { text: 'Acquired & Rebuilt — Okana (DTC Brand)' },
      { text: 'Migrated Infrastructure & Redesigned Front-End' },
      { text: 'Integrated Operational Automation End-to-End' },
    ],
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
      </div>
    </section>
  );
};

export default TechnicalRecordSection;
