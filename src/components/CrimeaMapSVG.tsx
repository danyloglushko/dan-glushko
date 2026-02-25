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

  // Mathematically accurate Crimean Peninsula outline
  const crimeaPath = `M158 195 L170 178 L185 165 L198 158 L215 148 L232 138 L248 130 L268 122 L288 115 L310 110 L332 108 L352 108 L370 112 L388 118 L402 126 L415 136 L425 148 L432 162 L436 178 L438 192 L435 205 L428 218 L418 230 L408 238 L395 245 L382 252 L368 260 L355 265 L340 268 L325 270 L308 272 L290 273 L272 272 L255 268 L238 262 L222 254 L210 245 L200 235 L192 224 L185 212 L178 200 L168 195 Z`;

  // Kerch Peninsula extension
  const kerchPath = `M432 162 L445 155 L458 150 L472 148 L485 150 L495 155 L502 162 L505 172 L502 182 L495 188 L485 192 L472 192 L458 188 L445 182 L438 175`;

  // Southern coast detail (Yalta region)
  const southCoastPath = `M275 273 L268 280 L262 285 L258 282 L265 276`;

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

      {/* Topographic contours */}
      <ellipse cx={320} cy={200} rx={160} ry={90} stroke="hsl(39 100% 94% / 0.035)" strokeWidth={0.5} />
      <ellipse cx={320} cy={195} rx={120} ry={65} stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.5} />
      <ellipse cx={325} cy={190} rx={80} ry={42} stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} />
      <ellipse cx={330} cy={185} rx={45} ry={25} stroke="hsl(39 100% 94% / 0.02)" strokeWidth={0.5} />

      {/* Peninsula outline */}
      <path
        d={crimeaPath}
        stroke="hsl(33 67% 67% / 0.4)"
        strokeWidth={1.4}
        fill="none"
        strokeLinejoin="round"
        strokeDasharray={1400}
        strokeDashoffset={isVisible ? 0 : 1400}
        style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Kerch extension */}
      <path
        d={kerchPath}
        stroke="hsl(33 67% 67% / 0.3)"
        strokeWidth={1.2}
        fill="none"
        strokeLinejoin="round"
        strokeDasharray={300}
        strokeDashoffset={isVisible ? 0 : 300}
        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.22,.61,.36,1) 0.5s' }}
      />

      {/* South coast detail */}
      <path
        d={southCoastPath}
        stroke="hsl(33 67% 67% / 0.25)"
        strokeWidth={1}
        fill="none"
        strokeDasharray={100}
        strokeDashoffset={isVisible ? 0 : 100}
        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.22,.61,.36,1) 0.8s' }}
      />

      {/* Sevastopol marker */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.8s ease 1.5s' }}>
        {/* Pulse rings */}
        <circle cx={205} cy={252} r={12}
          stroke="hsl(33 67% 67% / 0.25)" strokeWidth={0.8} fill="none"
          className="animate-pulse-subtle" />
        <circle cx={205} cy={252} r={20}
          stroke="hsl(33 67% 67% / 0.1)" strokeWidth={0.5} fill="none"
          className="animate-pulse-subtle"
          style={{ animationDelay: '0.5s' }} />
        {/* Core dot */}
        <circle cx={205} cy={252} r={3.5}
          fill="hsl(33 67% 67% / 0.8)"
          className="svg-node-glow" />

        {/* Label */}
        <text x={222} y={248} fill="hsl(33 67% 67% / 0.7)"
          fontFamily="var(--font-serif)" fontSize={9} fontWeight={400}
          letterSpacing="0.14em" fontStyle="italic">
          SEVASTOPOL
        </text>
        <text x={222} y={262} fill="hsl(39 100% 94% / 0.25)"
          fontFamily="var(--font-sans)" fontSize={6.5} letterSpacing="0.06em">
          44.6167°N · 33.5254°E
        </text>
      </g>

      {/* Coordinate labels */}
      <text x={10} y={395} fill="hsl(39 100% 94% / 0.12)"
        fontFamily="var(--font-sans)" fontSize={6.5} letterSpacing="0.06em">
        33°E
      </text>
      <text x={560} y={395} fill="hsl(39 100% 94% / 0.12)"
        fontFamily="var(--font-sans)" fontSize={6.5} letterSpacing="0.06em">
        36°E
      </text>
      <text x={10} y={15} fill="hsl(39 100% 94% / 0.12)"
        fontFamily="var(--font-sans)" fontSize={6.5} letterSpacing="0.06em">
        45.5°N
      </text>
      <text x={555} y={15} fill="hsl(39 100% 94% / 0.12)"
        fontFamily="var(--font-sans)" fontSize={6.5} letterSpacing="0.06em">
        44.3°N
      </text>
    </svg>
  );
};

export default CrimeaMapSVG;
