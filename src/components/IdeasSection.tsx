import useScrollReveal from '../hooks/useScrollReveal';

const ideas = [
  {
    title: 'Entropy is the default',
    body: 'Every system degrades without deliberate architecture. The question is never whether things will fall apart — it\'s whether the rate of decay exceeds the rate of repair.',
  },
  {
    title: 'Architecture beats effort',
    body: 'A well-designed system outperforms a team of brilliant operators running a broken one. Structure multiplies; effort adds.',
  },
  {
    title: 'Optimize at the margins',
    body: 'The greatest returns hide in the overlooked details — the second-order effects, the friction nobody measured, the incentive nobody questioned.',
  },
  {
    title: 'Pressure reveals structure',
    body: 'You don\'t understand a system until it\'s under load. Resilience isn\'t built in calm waters. It\'s tested in storms and measured in aftermath.',
  },
  {
    title: 'Durability is a strategy',
    body: 'Speed is overrated. The companies, systems, and people that endure do so because they were designed to absorb variance, not outrun it.',
  },
  {
    title: 'Perception is architecture',
    body: 'How a system is understood matters as much as how it functions. The invisible forces — incentives, framing, context — shape outcomes more than mechanics.',
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
          <h2 className="heading-serif text-4xl md:text-5xl">Ideas</h2>
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
