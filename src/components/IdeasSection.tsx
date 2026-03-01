import useScrollReveal from '../hooks/useScrollReveal';

const ideas = [
  {
    title: 'Entropy is the operating default',
    body: 'Every system I\'ve touched degrades without deliberate maintenance. The question was never whether things fall apart — it was whether I could engineer the repair cycle faster than the decay.',
  },
  {
    title: 'Architecture outperforms effort',
    body: 'I\'ve watched brilliant operators burn out running broken systems. A well-designed structure multiplies output. Raw effort only adds to it. I choose structure every time.',
  },
  {
    title: 'The highest returns hide at the margins',
    body: 'The biggest gains I\'ve captured weren\'t in the obvious places. They were in the second-order effects nobody measured, the friction nobody quantified, the incentive nobody questioned.',
  },
  {
    title: 'Incentives drive outcomes more reliably than intention',
    body: 'I\'ve designed incentive structures that self-corrected without management — and seen well-intentioned ones collapse under their own misalignment. Get the incentives right and the system runs itself.',
  },
  {
    title: 'Durability is a strategy, not a byproduct',
    body: 'The systems, businesses, and people that endure weren\'t lucky — they were engineered to absorb variance, not outrun it. I build for that.',
  },
  {
    title: 'Perception is load-bearing',
    body: 'How a system is understood shapes outcomes more than how it functions. The invisible forces — framing, context, positioning — are the real levers. I learned that selling chemical programs to skeptical operators.',
  },
];

const IdeasSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="ideas" className="section-margin section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <span className="chapter-label">Principles</span>
          <div className="divider-gold mt-4 mb-6" />
          <h2 className="heading-serif text-4xl md:text-5xl text-cream">How I Think</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 reveal" style={{ transitionDelay: '0.1s' }}>
          {ideas.map((idea, i) => (
            <div key={i} className="p-8 md:p-10 bg-background">
              <h3 className="font-serif text-xl md:text-2xl text-cream mb-3 italic">{idea.title}</h3>
              <p className="prose-editorial text-sm leading-relaxed">{idea.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeasSection;
