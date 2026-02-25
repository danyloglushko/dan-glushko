import { useEffect, useRef, useState } from 'react';

const FeedbackLoopSVG = () => {
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

  const nodes = [
    { x: 200, y: 60, label: 'SIGNAL' },
    { x: 340, y: 140, label: 'PROCESS' },
    { x: 280, y: 270, label: 'OUTPUT' },
    { x: 120, y: 200, label: 'OPTIMIZE' },
  ];

  return (
    <svg ref={ref} viewBox="0 0 400 330" className="w-full max-w-md mx-auto" fill="none">
      {/* Circular path */}
      <path
        d="M200 60 C300 60, 350 100, 340 140 C330 200, 320 240, 280 270 C230 300, 150 280, 120 200 C100 150, 140 70, 200 60"
        stroke="hsl(33 67% 67% / 0.15)"
        strokeWidth={1}
        strokeDasharray="4 6"
      />

      {/* Animated overlay */}
      <path
        d="M200 60 C300 60, 350 100, 340 140 C330 200, 320 240, 280 270 C230 300, 150 280, 120 200 C100 150, 140 70, 200 60"
        stroke="hsl(33 67% 67% / 0.4)"
        strokeWidth={1.4}
        strokeDasharray={600}
        strokeDashoffset={isVisible ? 0 : 600}
        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Arrow indicators between nodes */}
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const mx = (node.x + next.x) / 2;
        const my = (node.y + next.y) / 2;
        return (
          <polygon key={`arr-${i}`}
            points={`${mx - 3},${my - 3} ${mx + 3},${my} ${mx - 3},${my + 3}`}
            fill="hsl(33 67% 67% / 0.3)"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.4s ease ${1 + i * 0.2}s`
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i} style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 0.5s ease ${0.3 + i * 0.2}s`
        }}>
          <circle cx={node.x} cy={node.y} r={22}
            fill="hsl(224 29% 18% / 0.6)" stroke="hsl(33 67% 67% / 0.3)" strokeWidth={1.2} />
          <text x={node.x} y={node.y + 3} textAnchor="middle"
            fill="hsl(33 67% 67%)" fontFamily="var(--font-sans)" fontSize={7}
            fontWeight={500} letterSpacing="0.12em">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default FeedbackLoopSVG;
