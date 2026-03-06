import SystemsUnderPressureSVG from './SystemsUnderPressureSVG';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center grain-overlay overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 opacity-40">
        <SystemsUnderPressureSVG />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

      <div className="relative z-10 section-padding text-center max-w-4xl mx-auto">
        <div className="divider-gold mx-auto mb-8" />

        <h1 className="heading-serif text-5xl md:text-7xl lg:text-8xl mb-8 text-cream">
          Systems Under<br />
          <span className="text-gold italic">Pressure</span>
        </h1>

        <p className="prose-editorial mx-auto text-base md:text-lg max-w-xl">
          Designing durable systems across engineering, enterprise, and AI.
        </p>

        <p className="font-sans text-[11px] tracking-[0.15em] text-muted-foreground mt-4 max-w-md mx-auto">
          Engineer, systems builder, and founder exploring how durable systems are designed.
        </p>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <span className="chapter-label">Scroll to begin</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
