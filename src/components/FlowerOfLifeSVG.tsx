import { useEffect, useRef, useState } from 'react';

const FlowerOfLifeSVG = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cx = 220;
  const cy = 170;
  const r = 50;

  // Generate Flower of Life circles: center + 6 around it + 6 outer
  const circles: { x: number; y: number; ring: number }[] = [
    { x: cx, y: cy, ring: 0 },
  ];

  // First ring: 6 circles at distance r
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    circles.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      ring: 1,
    });
  }

  // Second ring: 6 circles at distance 2r (between first ring circles)
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    circles.push({
      x: cx + 2 * r * Math.cos(angle),
      y: cy + 2 * r * Math.sin(angle),
      ring: 2,
    });
  }

  // Additional second ring: 6 circles between outer positions
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 6 - Math.PI / 2;
    circles.push({
      x: cx + r * Math.sqrt(3) * Math.cos(angle),
      y: cy + r * Math.sqrt(3) * Math.sin(angle),
      ring: 2,
    });
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 340"
      className="w-full max-w-2xl mx-auto cursor-default"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="fol-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(33 67% 67% / 0.15)" />
          <stop offset="100%" stopColor="hsl(33 67% 67% / 0)" />
        </radialGradient>
      </defs>

      {/* Phase label */}
      <text
        x="220" y="20" textAnchor="middle"
        fill="hsl(39 100% 94% / 0.2)" fontFamily="var(--font-sans)"
        fontSize="8" letterSpacing="0.25em"
      >
        DURABILITY
      </text>

      {/* Center glow */}
      <circle
        cx={cx} cy={cy} r={r * 2.2}
        fill="url(#fol-center-glow)"
        className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 1.5s ease' }}
      />

      {/* Outer bounding circle */}
      <circle
        cx={cx} cy={cy} r={r * 2 + 2}
        fill="none"
        stroke="hsl(33 67% 67% / 0.08)"
        strokeWidth={0.8}
        className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 1.8s ease' }}
      />

      {/* Flower of Life circles with staggered reveal */}
      {circles.map((c, i) => {
        const delay = c.ring * 0.4 + i * 0.06;
        const opacity = c.ring === 0 ? 0.35 : c.ring === 1 ? 0.2 : 0.1;
        return (
          <circle
            key={i}
            cx={c.x} cy={c.y} r={r}
            fill="none"
            stroke={`hsl(33 67% 67% / ${opacity})`}
            strokeWidth={c.ring === 0 ? 1.4 : c.ring === 1 ? 1.0 : 0.7}
            className={isVisible ? 'opacity-100' : 'opacity-0'}
            style={{
              transition: `opacity 0.8s ease ${delay}s, stroke-width 0.6s ease`,
            }}
          />
        );
      })}

      {/* Petal intersections: small dots at key intersection points */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const halfAngle = (Math.PI / 3) * i + Math.PI / 6 - Math.PI / 2;
        const ix = cx + (r / 2) * Math.cos(angle);
        const iy = cy + (r / 2) * Math.sin(angle);
        const ix2 = cx + (r / 2) * Math.cos(halfAngle);
        const iy2 = cy + (r / 2) * Math.sin(halfAngle);
        return (
          <g key={`petals-${i}`}>
            <circle
              cx={ix} cy={iy} r={1.5}
              fill="hsl(33 67% 67% / 0.5)"
              className={isVisible ? 'opacity-100' : 'opacity-0'}
              style={{ transition: `opacity 1s ease ${1.2 + i * 0.1}s` }}
            />
            <circle
              cx={ix2} cy={iy2} r={1.5}
              fill="hsl(33 67% 67% / 0.5)"
              className={isVisible ? 'opacity-100' : 'opacity-0'}
              style={{ transition: `opacity 1s ease ${1.2 + i * 0.1}s` }}
            />
          </g>
        );
      })}

      {/* Dynamic element: slowly rotating highlight ring */}
      <g
        className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 2s ease 1.5s' }}
      >
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="hsl(33 67% 67% / 0.12)"
          strokeWidth={2}
          strokeDasharray="8 24"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: isVisible ? 'fol-rotate 30s linear infinite' : 'none',
          }}
        />
        <circle
          cx={cx} cy={cy} r={r * 1.5}
          fill="none"
          stroke="hsl(33 67% 67% / 0.06)"
          strokeWidth={1.2}
          strokeDasharray="4 20"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: isVisible ? 'fol-rotate-reverse 45s linear infinite' : 'none',
          }}
        />
      </g>

      {/* Center seed dot */}
      <circle
        cx={cx} cy={cy} r={2.5}
        fill="hsl(33 67% 67% / 0.7)"
        className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 1s ease 1.8s' }}
      />

      {/* Bottom caption */}
      <text
        x="220" y="330" textAnchor="middle"
        fill="hsl(39 100% 94% / 0.12)" fontFamily="var(--font-sans)"
        fontSize="5.5" letterSpacing="0.15em"
      >
        LOAD BEARING STRUCTURE
      </text>

      <style>{`
        @keyframes fol-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fol-rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </svg>
  );
};

export default FlowerOfLifeSVG;
