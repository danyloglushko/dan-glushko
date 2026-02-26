import { useEffect, useRef, useState } from 'react';

// Crimea coastline path extracted from Wikimedia Commons "Outline Map of Crimea"
// Original SVG: 1000x677.8 viewBox. Path scaled to fit our 500x340 viewBox.
// This is the actual geographic outline, not hand-drawn approximation.
const CRIMEA_PATH = `M 289.2 84.2 l 2.2 -0.8 6.7 -1.1 13.2 25 47.7 43.2 30.2 -23.9 51.8 -4.3 22.7 8.2 25.2 5.7 -1.4 12.3 -4.5 6.8 -6.6 6.1 -0.5 2.7 1.1 6.6 -5.9 7 -3.4 7.3 -4.1 18.9 -25 4.3 -44.8 9.5 -9.8 -6.4 -18.9 -12.7 -13.4 2.5 -9.3 20 -27 9.1 0 13.4 -11.8 3.6 -35.4 -2.7 -29.3 24.9 -23.6 21.8 -23.6 6.8 -23 0.2 0.1 -5.2 1.5 -2 7 -2.5 4.3 -1.7 2.9 0.6 2.6 -0.1 -1.1 -2.8 -2.5 -4.1 0.2 -1.4 -1.1 -0.3 -1.8 -1.8 0.1 -1.7 0.7 -1 -0.4 -1 -1.2 0.2 -1.4 -1.5 1.3 -1.4 -1.5 -1.7 -1.3 -0.1 0.2 -6.3 -0.7 -1.4 -1.9 0.2 -3.5 -1.5 0 -4.1 -2.5 1.5 -3.4 -2.3 -0.2 -2.7 1.7 -0.7 -0.2 -1.2 2.1 -3.4 2.8 -1.7 -2.6 -3.7 -1.4 0.2 -0.9 -2.2 -11.9 1 -1 -5.4 7.3 -2.2 -1.9 -4.8 -9.4 -2.1 -0.8 0.9 -1.3 -5.8 -2.7 -4 1.9 -10.3 -10.6 -30.9 -6.7 -6.4 -16.7 9.9 -35.3 -29.2 -19.9 -10 -15.1 12.2 -21.9 -5.8 -3.5 -19.6 28.6 -51.4 43.7 -28 11.9 -17.7 11.6 2.9 24.7 -11.2 11.7 -25.5 2.9 -10.8 -2.4 -0.3 4.6 4.9 -0.4 2.2 -1.3 -5 1.1 -2.7 -0.6 -1.4 -1.8 -1.4 0.3 -4.5 2.1 0.8 4.3 5.3 2.7 0.5 5.1 2.1 10.1 -0.5 17.4 9.5 5.1 1.9 4.5 -1.3 8.5 7.7 9.3 2.9 3.4 -0.5 8.4 0 3.9 4.2 4.7 8 4.3 4.8 4.3 1 4 -4 2.9 0 2.6 -2.6 5.6 -1.4 5.9 8.4 8.5 5.8 5.1 3.5 -0.6 13.7 z`;

const CrimeaMapSVG = () => {
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

  // Sevastopol approximate position within the scaled path
  // In original SVG ~(170, 350), scaled by 0.5 → ~(85, 175)
  const sevX = 136;
  const sevY = 222;

  return (
    <svg
      ref={ref}
      viewBox="40 20 460 300"
      className="w-full max-w-lg mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coordinate grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`v-${i}`} x1={60 + i * 65} y1={20} x2={60 + i * 65} y2={320}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h-${i}`} x1={40} y1={30 + i * 55} x2={500} y2={30 + i * 55}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      ))}

      {/* Topographic contours */}
      <ellipse cx={280} cy={150} rx={120} ry={55}
        stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.5} fill="none" />
      <ellipse cx={285} cy={145} rx={75} ry={35}
        stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} fill="none" />

      {/* Main peninsula outline — from Wikimedia Commons accurate data */}
      <path
        d={CRIMEA_PATH}
        stroke="hsl(33 67% 67% / 0.5)"
        strokeWidth={1.4}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={4000}
        strokeDashoffset={isVisible ? 0 : 4000}
        style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Sevastopol marker */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.8s ease 1.5s' }}>
        <circle cx={sevX} cy={sevY} r={10}
          stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.6} fill="none"
          className="animate-pulse-subtle" />
        <circle cx={sevX} cy={sevY} r={18}
          stroke="hsl(33 67% 67% / 0.08)" strokeWidth={0.4} fill="none"
          className="animate-pulse-subtle" style={{ animationDelay: '0.5s' }} />
        <circle cx={sevX} cy={sevY} r={3}
          fill="hsl(33 67% 67% / 0.8)" className="svg-node-glow" />

        <text x={sevX - 50} y={sevY + 28} fill="hsl(33 67% 67% / 0.7)"
          fontFamily="var(--font-serif)" fontSize={8} fontWeight={400}
          letterSpacing="0.14em" fontStyle="italic">
          SEVASTOPOL
        </text>
        <text x={sevX - 50} y={sevY + 40} fill="hsl(39 100% 94% / 0.2)"
          fontFamily="var(--font-sans)" fontSize={6} letterSpacing="0.06em">
          44.6167°N · 33.5254°E
        </text>
      </g>

      {/* City labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 2s' }}>
        {/* Yalta - south coast, east of Sevastopol */}
        <circle cx={195} cy={210} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={200} y={213} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">YALTA</text>

        {/* Kerch - eastern tip */}
        <circle cx={475} cy={125} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={448} y={118} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">KERCH</text>

        {/* Simferopol - center */}
        <circle cx={245} cy={155} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={250} y={158} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">SIMFEROPOL</text>
      </g>

      {/* Coordinate labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 2.2s' }}>
        <text x={55} y={315} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">33°E</text>
        <text x={480} y={315} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">36°E</text>
        <text x={55} y={35} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">46°N</text>
        <text x={55} y={295} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">44°N</text>
      </g>
    </svg>
  );
};

export default CrimeaMapSVG;
