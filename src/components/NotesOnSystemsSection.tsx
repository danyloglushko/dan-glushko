import useScrollReveal from '../hooks/useScrollReveal';

const notes = [
  'Architecture outperforms effort.',
  'Incentives shape behavior more reliably than intention.',
  'Durable systems are designed around constraints, not optimism.',
];

const NotesOnSystemsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="notes" className="section-margin section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="reveal mb-12">
          <span className="chapter-label">Notes on Systems</span>
          <div className="divider-gold mt-4 mb-6" />
        </div>

        <div className="reveal space-y-6" style={{ transitionDelay: '0.15s' }}>
          {notes.map((note, i) => (
            <p key={i} className="font-serif text-lg md:text-xl text-cream/80 italic">
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotesOnSystemsSection;
