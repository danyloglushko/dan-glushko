import useScrollReveal from '../hooks/useScrollReveal';

const capabilities = [
  'Brand acquisition & due diligence',
  'Infrastructure migration to modern stack',
  'Front-end architecture rebuild',
  'Subscription system redesign',
  'API integrations & third-party orchestration',
  'AI-enabled customer workflows',
  'Conversion optimization via systems analysis',
];

const OkanaCaseStudy = () => {
  const ref = useScrollReveal();

  return (
    <section id="okana" className="section-margin section-padding grain-overlay" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <span className="chapter-label">Case Study</span>
          <div className="divider-gold mt-4 mb-6" />
          <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl text-cream">
            Okana
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start" style={{ transitionDelay: '0.15s' }}>
          <div className="prose-editorial space-y-6">
            <p>
              Okana was not a brand launch — it was a <strong>systems rebuild</strong>. 
              The acquisition presented a structurally sound product with 
              deteriorating infrastructure and fragmented operations.
            </p>
            <p>
              The intervention was architectural: migrate the technology stack, 
              redesign the subscription engine, integrate AI-driven customer workflows, 
              and rebuild the front-end for conversion performance. 
              Every decision was evaluated against <strong>long-term operational cost</strong>, 
              not short-term growth metrics.
            </p>
            <p>
              The result: a DTC brand operating on modern infrastructure 
              with automated workflows, reduced operational overhead, 
              and a systems architecture designed to compound — not just scale.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border border-border/40 rounded-sm p-8 bg-card/20">
              <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-6">
                Execution Scope
              </h3>
              <ul className="space-y-3">
                {capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0" />
                    <span className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://getokana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-gold/30 text-gold font-sans text-[10px] tracking-[0.2em] uppercase rounded-sm btn-lift hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
            >
              Visit getokana.com →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OkanaCaseStudy;
