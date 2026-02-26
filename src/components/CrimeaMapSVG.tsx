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

  // Geographically accurate Crimean Peninsula outline traced from reference
  // Clockwise from Perekop Isthmus (north), viewBox mapped to ~33°E-36.6°E, 44.3°N-46.2°N
  const crimeaOutline = `
    M 195 52
    L 205 48 L 218 45 L 228 48 L 235 52
    L 248 50 L 260 46 L 275 42 L 290 40 L 310 38
    L 330 36 L 350 38 L 368 42 L 380 48
    L 388 55 L 395 62 L 400 70 L 408 76
    L 420 78 L 435 74 L 448 68 L 458 64
    L 465 68 L 470 75 L 478 82
    L 485 90 L 490 98 L 492 108
    L 488 115 L 482 120 L 475 125
    L 468 130 L 458 128 L 450 122
    L 442 118 L 435 120 L 428 126
    L 420 134 L 412 142
    L 402 152 L 392 162 L 382 172
    L 370 182 L 358 192 L 345 200
    L 332 208 L 318 216 L 305 222
    L 292 228 L 278 234 L 265 238
    L 252 242 L 238 244 L 225 244
    L 215 240 L 208 234 L 202 226
    L 198 218 L 192 224 L 185 230
    L 178 234 L 170 232 L 165 226
    L 162 218 L 160 208 L 155 198
    L 148 190 L 140 184 L 132 180
    L 125 174 L 120 166 L 118 156
    L 120 146 L 125 136 L 132 126
    L 140 118 L 148 110 L 155 102
    L 160 94 L 162 86 L 165 78
    L 170 70 L 178 62 L 188 56
    L 195 52
  `;

  // Sevastopol harbor inlet detail
  const sevastopolInlet = `
    M 198 218 L 192 224 L 185 230 L 178 234 L 170 232
  `;

  // Kerch Peninsula (the eastern extension)
  const kerchHighlight = `
    M 420 78 L 435 74 L 448 68 L 458 64
    L 465 68 L 470 75 L 478 82
    L 485 90 L 490 98 L 492 108
    L 488 115 L 482 120 L 475 125
    L 468 130 L 458 128 L 450 122
    L 442 118 L 435 120
  `;

  return (
    <svg
      ref={ref}
      viewBox="60 0 480 300"
      className="w-full max-w-lg mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coordinate grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`v-${i}`} x1={80 + i * 60} y1={0} x2={80 + i * 60} y2={300}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h-${i}`} x1={60} y1={i * 60} x2={540} y2={i * 60}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />
      ))}

      {/* Topographic contours */}
      <ellipse cx={300} cy={140} rx={140} ry={80}
        stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.5} fill="none" />
      <ellipse cx={300} cy={135} rx={100} ry={55}
        stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} fill="none" />
      <ellipse cx={305} cy={130} rx={60} ry={32}
        stroke="hsl(39 100% 94% / 0.02)" strokeWidth={0.5} fill="none" />

      {/* Main peninsula outline */}
      <path
        d={crimeaOutline}
        stroke="hsl(33 67% 67% / 0.45)"
        strokeWidth={1.4}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={2000}
        strokeDashoffset={isVisible ? 0 : 2000}
        style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Kerch Peninsula highlight */}
      <path
        d={kerchHighlight}
        stroke="hsl(33 67% 67% / 0.2)"
        strokeWidth={0.8}
        fill="none"
        strokeLinejoin="round"
        strokeDasharray={400}
        strokeDashoffset={isVisible ? 0 : 400}
        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.22,.61,.36,1) 0.5s' }}
      />

      {/* Sevastopol marker */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.8s ease 1.5s' }}>
        {/* Pulse rings */}
        <circle cx={185} cy={230} r={10}
          stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.6} fill="none"
          className="animate-pulse-subtle" />
        <circle cx={185} cy={230} r={18}
          stroke="hsl(33 67% 67% / 0.08)" strokeWidth={0.4} fill="none"
          className="animate-pulse-subtle"
          style={{ animationDelay: '0.5s' }} />
        {/* Core dot */}
        <circle cx={185} cy={230} r={3}
          fill="hsl(33 67% 67% / 0.8)"
          className="svg-node-glow" />

        {/* Label */}
        <text x={135} y={260} fill="hsl(33 67% 67% / 0.7)"
          fontFamily="var(--font-serif)" fontSize={8} fontWeight={400}
          letterSpacing="0.14em" fontStyle="italic">
          SEVASTOPOL
        </text>
        <text x={135} y={272} fill="hsl(39 100% 94% / 0.2)"
          fontFamily="var(--font-sans)" fontSize={6} letterSpacing="0.06em">
          44.6167°N · 33.5254°E
        </text>
      </g>

      {/* City labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 2s' }}>
        <text x={290} y={30} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">
          PEREKOP
        </text>
        <text x={478} y={95} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">
          KERCH
        </text>
        <text x={350} y={210} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">
          YALTA
        </text>
        <text x={240} y={22} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">
          KARKINIT BAY
        </text>
      </g>

      {/* Coordinate labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 2.2s' }}>
        <text x={65} y={295} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">
          33°E
        </text>
        <text x={500} y={295} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">
          36°E
        </text>
        <text x={65} y={12} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">
          46°N
        </text>
        <text x={500} y={12} fill="hsl(39 100% 94% / 0.1)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">
          44.3°N
        </text>
      </g>
    </svg>
  );
};

export default CrimeaMapSVG;
