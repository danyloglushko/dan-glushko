import { useEffect, useRef, useState } from 'react';

interface Milestone {
  x: number;
  y: number;
  label: string;
  year: string;
}

const JourneyMapSVG = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<SVGSVGElement>(null);

  const milestones: Milestone[] = [
    { x: 80, y: 300, label: 'Sevastopol, Crimea', year: 'Origin' },
    { x: 240, y: 220, label: 'Temple, Texas', year: 'Immigration' },
    { x: 420, y: 140, label: 'Austin, Texas', year: 'UT Austin' },
    { x: 580, y: 80, label: 'Kuwait', year: 'Field Operations' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pathD = `M${milestones[0].x} ${milestones[0].y} C${milestones[0].x + 80} ${milestones[0].y - 40}, ${milestones[1].x - 60} ${milestones[1].y + 30}, ${milestones[1].x} ${milestones[1].y} C${milestones[1].x + 80} ${milestones[1].y - 40}, ${milestones[2].x - 60} ${milestones[2].y + 30}, ${milestones[2].x} ${milestones[2].y} C${milestones[2].x + 80} ${milestones[2].y - 30}, ${milestones[3].x - 60} ${milestones[3].y + 30}, ${milestones[3].x} ${milestones[3].y}`;

  return (
    <svg
      ref={ref}
      viewBox="0 0 660 380"
      className="w-full max-w-3xl mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Abstract continent shapes - very minimal wireframe */}
      <path d="M40 280 C60 260, 100 250, 130 270 C140 280, 120 300, 80 310 C50 315, 35 300, 40 280Z"
        stroke="hsl(39 100% 94% / 0.06)" strokeWidth={0.5} fill="none" />
      <path d="M180 180 C220 160, 320 150, 370 170 C400 180, 380 210, 320 220 C260 230, 190 210, 180 180Z"
        stroke="hsl(39 100% 94% / 0.06)" strokeWidth={0.5} fill="none" />
      <path d="M520 60 C560 40, 620 50, 640 80 C650 100, 620 120, 580 110 C540 100, 510 80, 520 60Z"
        stroke="hsl(39 100% 94% / 0.06)" strokeWidth={0.5} fill="none" />

      {/* Path trail (muted) */}
      <path d={pathD}
        stroke="hsl(39 100% 94% / 0.08)"
        strokeWidth={1}
        strokeDasharray="4 6" />

      {/* Animated gold path */}
      <path d={pathD}
        stroke="hsl(33 67% 67% / 0.5)"
        strokeWidth={1.4}
        strokeDasharray={800}
        strokeDashoffset={isVisible ? 0 : 800}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 3s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Milestone nodes */}
      {milestones.map((m, i) => (
        <g key={i}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="cursor-pointer"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.6s ease ${0.8 + i * 0.4}s`
          }}
        >
          {/* Outer ring */}
          <circle cx={m.x} cy={m.y} r={hoveredIndex === i ? 16 : 12}
            stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.8} fill="none"
            style={{ transition: 'r 0.3s ease' }} />
          {/* Core */}
          <circle cx={m.x} cy={m.y} r={hoveredIndex === i ? 5 : 4}
            fill="hsl(33 67% 67% / 0.7)"
            style={{ transition: 'r 0.3s ease' }} />

          {/* Tooltip on hover */}
          {hoveredIndex === i && (
            <g>
              <rect x={m.x - 60} y={m.y - 48} width={120} height={32} rx={2}
                fill="hsl(224 29% 18% / 0.95)" stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.5} />
              <text x={m.x} y={m.y - 33} textAnchor="middle"
                fill="hsl(33 67% 67%)" fontFamily="var(--font-sans)" fontSize={8}
                fontWeight={500} letterSpacing="0.1em">
                {m.year.toUpperCase()}
              </text>
              <text x={m.x} y={m.y - 22} textAnchor="middle"
                fill="hsl(39 100% 94% / 0.6)" fontFamily="var(--font-sans)" fontSize={7}>
                {m.label}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
};

export default JourneyMapSVG;
