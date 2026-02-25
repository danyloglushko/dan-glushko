import { useEffect, useRef, useState } from 'react';

const TransferModelSVG = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tiers = [
    { y: 60, label: 'RESERVOIR SYSTEMS', sublabel: 'Pressure · Flow · Containment', color: 'hsl(33 67% 67% / 0.3)' },
    { y: 170, label: 'BUSINESS SYSTEMS', sublabel: 'Capital · Operations · Feedback', color: 'hsl(33 67% 67% / 0.5)' },
    { y: 280, label: 'AI SYSTEMS', sublabel: 'Signal · Optimization · Autonomy', color: 'hsl(33 67% 67% / 0.7)' },
  ];

  const transferLines = [
    { x1: 200, y1: 90, x2: 120, y2: 150, label: 'Pressure' },
    { x1: 300, y1: 90, x2: 300, y2: 150, label: 'Flow' },
    { x1: 400, y1: 90, x2: 480, y2: 150, label: 'Feedback' },
    { x1: 120, y1: 200, x2: 200, y2: 260, label: 'Pressure' },
    { x1: 300, y1: 200, x2: 300, y2: 260, label: 'Flow' },
    { x1: 480, y1: 200, x2: 400, y2: 260, label: 'Feedback' },
  ];

  return (
    <svg ref={ref} viewBox="0 0 600 340" className="w-full max-w-2xl mx-auto" fill="none">
      {/* Tiers */}
      {tiers.map((tier, i) => (
        <g key={i} style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 0.6s ease ${i * 0.3}s`
        }}>
          <rect x={80} y={tier.y} width={440} height={50} rx={2}
            stroke={tier.color} strokeWidth={1.2} fill="hsl(224 29% 18% / 0.3)" />
          <text x={300} y={tier.y + 22} textAnchor="middle"
            fill="hsl(33 67% 67%)" fontFamily="var(--font-sans)" fontSize={9}
            fontWeight={500} letterSpacing="0.15em">
            {tier.label}
          </text>
          <text x={300} y={tier.y + 38} textAnchor="middle"
            fill="hsl(39 100% 94% / 0.35)" fontFamily="var(--font-sans)" fontSize={7}
            letterSpacing="0.08em">
            {tier.sublabel}
          </text>
        </g>
      ))}

      {/* Transfer lines */}
      {transferLines.map((line, i) => (
        <g key={`tl-${i}`} style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 0.5s ease ${0.6 + i * 0.15}s`
        }}>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="hsl(33 67% 67% / 0.2)" strokeWidth={1} strokeDasharray="3 4" />
          <circle cx={(line.x1 + line.x2) / 2} cy={(line.y1 + line.y2) / 2} r={2}
            fill="hsl(33 67% 67% / 0.4)" />
        </g>
      ))}
    </svg>
  );
};

export default TransferModelSVG;
