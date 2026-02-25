import { useEffect, useRef, useState } from 'react';

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

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 400"
      className="w-full max-w-2xl mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coordinate grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`cg-v-${i}`} x1={i * 100} y1={0} x2={i * 100} y2={400}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`cg-h-${i}`} x1={0} y1={i * 100} x2={600} y2={i * 100}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      ))}

      {/* Topographic contours - very subtle */}
      <ellipse cx={300} cy={200} rx={180} ry={110} stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      <ellipse cx={300} cy={200} rx={140} ry={85} stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.5} />
      <ellipse cx={300} cy={200} rx={100} ry={60} stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} />

      {/* Crimea peninsula outline - stylized */}
      <path
        d="M180 140 C200 120, 280 100, 380 110 C430 115, 470 130, 490 160 C510 190, 500 220, 480 250 C460 275, 420 290, 390 300 C360 310, 340 315, 310 310 C280 305, 240 290, 220 270 C190 245, 170 220, 165 195 C160 170, 165 150, 180 140Z"
        stroke="hsl(33 67% 67% / 0.35)"
        strokeWidth={1.4}
        fill="hsl(33 67% 67% / 0.03)"
        className={isVisible ? 'animate-draw-path' : ''}
        strokeDasharray={1200}
        strokeDashoffset={isVisible ? 0 : 1200}
        style={{
          transition: 'stroke-dashoffset 2.5s cubic-bezier(.22,.61,.36,1)',
          ['--path-length' as string]: '1200',
        }}
      />

      {/* Sevastopol marker */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.8s ease 1.5s' }}>
        {/* Pulse ring */}
        <circle cx={230} cy={260} r={12}
          stroke="hsl(33 67% 67% / 0.3)" strokeWidth={1} fill="none"
          className="animate-pulse-subtle" />
        <circle cx={230} cy={260} r={20}
          stroke="hsl(33 67% 67% / 0.12)" strokeWidth={0.5} fill="none"
          className="animate-pulse-subtle"
          style={{ animationDelay: '0.5s' }} />
        {/* Core dot */}
        <circle cx={230} cy={260} r={4}
          fill="hsl(33 67% 67% / 0.8)"
          className="svg-node-glow" />

        {/* Label */}
        <text x={248} y={256} fill="hsl(33 67% 67% / 0.7)"
          fontFamily="var(--font-sans)" fontSize={9} fontWeight={500}
          letterSpacing="0.12em">
          SEVASTOPOL
        </text>
        <text x={248} y={270} fill="hsl(39 100% 94% / 0.3)"
          fontFamily="var(--font-sans)" fontSize={7} letterSpacing="0.08em">
          44.6167°N, 33.5254°E
        </text>
      </g>

      {/* Coordinate labels */}
      <text x={10} y={395} fill="hsl(39 100% 94% / 0.15)"
        fontFamily="var(--font-sans)" fontSize={7} letterSpacing="0.06em">
        33°E
      </text>
      <text x={560} y={395} fill="hsl(39 100% 94% / 0.15)"
        fontFamily="var(--font-sans)" fontSize={7} letterSpacing="0.06em">
        36°E
      </text>
      <text x={10} y={15} fill="hsl(39 100% 94% / 0.15)"
        fontFamily="var(--font-sans)" fontSize={7} letterSpacing="0.06em">
        45.5°N
      </text>
    </svg>
  );
};

export default CrimeaMapSVG;
