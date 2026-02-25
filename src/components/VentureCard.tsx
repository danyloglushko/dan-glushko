import useScrollReveal from '../hooks/useScrollReveal';

interface VentureCardProps {
  name: string;
  description: string;
  role: string;
  url?: string;
}

const VentureCard = ({ name, description, role, url }: VentureCardProps) => {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="reveal">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-8 md:p-10 border border-border rounded bg-card/30 hover:bg-card/60 transition-all duration-500 btn-lift group"
      >
        <span className="chapter-label">{role}</span>
        <h3 className="heading-serif text-3xl md:text-4xl mt-3 mb-4 text-cream group-hover:text-gold transition-colors duration-300">
          {name}
        </h3>
        <p className="prose-editorial text-sm">{description}</p>
        {url && (
          <span className="inline-block mt-6 text-gold font-sans text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Visit →
          </span>
        )}
      </a>
    </div>
  );
};

export default VentureCard;
