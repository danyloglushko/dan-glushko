import { useEffect, useRef, useState } from 'react';

const SevastopolDetailSVG = () => {
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
    <svg ref={ref} viewBox="0 0 400 300" className="w-full max-w-md mx-auto" fill="none">
      {/* Blueprint grid — fine */}
      {Array.from({ length: 21 }).map((_, i) => (
        <line key={`bg-v-${i}`} x1={i * 20} y1={0} x2={i * 20} y2={300}
          stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.3} />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`bg-h-${i}`} x1={0} y1={i * 20} x2={400} y2={i * 20}
          stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.3} />
      ))}

      {/* Harbor outline — Sevastopol bay system */}
      <path
        d="M80 120 L120 100 L160 95 L200 100 L230 115 L250 130 L260 150 L255 170 L240 185 L220 195 L195 200 L170 198 L145 190 L125 178 L110 165 L95 148 L85 135 Z"
        stroke="hsl(33 67% 67% / 0.35)"
        strokeWidth={1.4}
        fill="none"
        strokeLinejoin="round"
        strokeDasharray={800}
        strokeDashoffset={isVisible ? 0 : 800}
        style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Inner harbor — South Bay */}
      <path
        d="M140 140 L165 130 L190 128 L210 135 L220 148 L215 162 L200 170 L180 172 L160 168 L148 158 L142 148 Z"
        stroke="hsl(33 67% 67% / 0.2)"
        strokeWidth={1}
        fill="none"
        strokeDasharray={400}
        strokeDashoffset={isVisible ? 0 : 400}
        style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.22,.61,.36,1) 0.4s' }}
      />

      {/* Artillery Bay */}
      <path
        d="M150 155 L170 150 L185 155 L182 165 L168 168 L155 163 Z"
        stroke="hsl(33 67% 67% / 0.15)"
        strokeWidth={0.8}
        fill="none"
        strokeDasharray={150}
        strokeDashoffset={isVisible ? 0 : 150}
        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.22,.61,.36,1) 0.6s' }}
      />

      {/* Depth contours */}
      <path d="M120 135 C140 125, 190 120, 230 135" stroke="hsl(39 100% 94% / 0.05)" strokeWidth={0.5} fill="none" />
      <path d="M130 145 C150 135, 185 132, 225 145" stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} fill="none" />

      {/* Measurement lines */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 1.2s' }}>
        <line x1={80} y1={220} x2={260} y2={220} stroke="hsl(33 67% 67% / 0.15)" strokeWidth={0.5} />
        <line x1={80} y1={217} x2={80} y2={223} stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.5} />
        <line x1={260} y1={217} x2={260} y2={223} stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.5} />
        <text x={170} y={232} textAnchor="middle" fill="hsl(39 100% 94% / 0.2)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">
          7.4 KM
        </text>
      </g>

      {/* Labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 1s' }}>
        <text x={290} y={100} fill="hsl(33 67% 67% / 0.5)"
          fontFamily="var(--font-serif)" fontSize={8} fontStyle="italic" letterSpacing="0.1em">
          SEVASTOPOL
        </text>
        <text x={290} y={112} fill="hsl(39 100% 94% / 0.2)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">
          Harbor Detail
        </text>
        <text x={290} y={125} fill="hsl(39 100% 94% / 0.15)"
          fontFamily="var(--font-sans)" fontSize={5} letterSpacing="0.06em">
          44°37'N · 33°31'E
        </text>
      </g>

      {/* Corner markers */}
      <path d="M10 10 L10 30 M10 10 L30 10" stroke="hsl(33 67% 67% / 0.15)" strokeWidth={0.5} />
      <path d="M390 10 L390 30 M390 10 L370 10" stroke="hsl(33 67% 67% / 0.15)" strokeWidth={0.5} />
      <path d="M10 290 L10 270 M10 290 L30 290" stroke="hsl(33 67% 67% / 0.15)" strokeWidth={0.5} />
      <path d="M390 290 L390 270 M390 290 L370 290" stroke="hsl(33 67% 67% / 0.15)" strokeWidth={0.5} />
    </svg>
  );
};

export default SevastopolDetailSVG;
