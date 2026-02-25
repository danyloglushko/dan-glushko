import useScrollReveal from '../hooks/useScrollReveal';

const ideas = [
  {
    title: 'Entropy is the default',
    body: 'Every system degrades without deliberate architecture. The question is never whether things fall apart — it\'s whether decay outpaces repair.',
  },
  {
    title: 'Architecture beats effort',
    body: 'A well-designed system outperforms brilliant operators running a broken one. Structure multiplies. Effort adds.',
  },
  {
    title: 'Optimization lives at the margins',
    body: 'The greatest returns hide in the overlooked — the second-order effects, the friction nobody measured, the incentive nobody questioned.',
  },
  {
    title: 'Incentives drive outcomes more reliably than intention',
    body: 'Design the incentive structure correctly and the system self-corrects. Design it poorly and no amount of management compensates.',
  },
  {
    title: 'Durability is a strategy',
    body: 'The companies, systems, and people that endure were designed to absorb variance, not outrun it.',
  },
  {
    title: 'Perception is architecture',
    body: 'How a system is understood shapes outcomes more than how it functions. The invisible forces — framing, context, incentives — are the real levers.',
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
