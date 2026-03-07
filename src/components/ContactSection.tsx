import useScrollReveal from '../hooks/useScrollReveal';

const ContactSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="section-margin section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="reveal">
          <div className="divider-gold mx-auto mb-8" />
          <h2 className="heading-serif text-4xl md:text-5xl mb-6">Contact</h2>
          <p className="prose-editorial mx-auto text-center mb-12">
            If you are building durable systems, exploring acquisitions, or working on something
            interesting, I am always open to thoughtful conversations.
          </p>

          <a
            href="https://cal.com/livadea/intro-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-3.5 bg-gold/10 border border-gold/50 text-gold font-sans text-xs tracking-[0.2em] uppercase rounded-sm btn-lift hover:border-gold hover:bg-gold/20 transition-all duration-300"
          >
            Schedule a Conversation
          </a>

          <div className="mt-8 flex flex-col items-center gap-1.5">
            <span className="font-sans text-[11px] tracking-[0.12em] text-muted-foreground/60">
              or reach out directly
            </span>
            <a
              href="mailto:dan@livadea.com"
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-gold transition-colors duration-300"
            >
              dan@livadea.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 pt-8 border-t border-border/30 reveal" style={{ transitionDelay: '0.2s' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif text-lg text-gold">Dan Glushko</span>
          <div className="flex items-center gap-6">
            <a href="https://livadea.com" target="_blank" rel="noopener noreferrer"
              className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-nav hover:text-gold transition-colors">
              Livadea
            </a>
            <a href="https://systems.livadea.com" target="_blank" rel="noopener noreferrer"
              className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-nav hover:text-gold transition-colors">
              Livadea Systems
            </a>
            <a href="https://getokana.com" target="_blank" rel="noopener noreferrer"
              className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-nav hover:text-gold transition-colors">
              Okana
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="font-sans text-[10px] text-muted-foreground tracking-[0.15em]">
              Austin, Texas
            </span>
            <span className="font-sans text-[10px] text-muted-nav tracking-wider">
              Engineer and systems builder · © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
