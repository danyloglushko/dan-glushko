import { useEffect, useRef } from 'react';

const HasslerCoreholderSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 720 380"
      className="w-full h-auto hassler-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for steel body */}
        <linearGradient id="steelBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(39 10% 40%)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="hsl(39 10% 25%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(39 10% 40%)" stopOpacity="0.25" />
        </linearGradient>
        {/* Core sample pattern */}
        <pattern id="coreTexture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.8" fill="hsl(33 67% 67% / 0.15)" />
        </pattern>
        {/* Confining fluid */}
        <linearGradient id="confiningFluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(200 40% 50%)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(200 40% 50%)" stopOpacity="0.04" />
        </linearGradient>
        {/* Flow arrow marker */}
        <marker id="flowArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="hsl(33 67% 67% / 0.6)" />
        </marker>
        <marker id="flowArrowLeft" markerWidth="6" markerHeight="4" refX="1" refY="2" orient="auto-start-reverse">
          <path d="M6,0 L0,2 L6,4" fill="hsl(33 67% 67% / 0.6)" />
        </marker>
      </defs>

      {/* Faint grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`vg-${i}`} x1={i * 100} y1={0} x2={i * 100} y2={380}
          stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`hg-${i}`} x1={0} y1={i * 95} x2={720} y2={i * 95}
          stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} />
      ))}

      {/* === MAIN VESSEL BODY === */}
      {/* Outer steel cylinder */}
      <rect
        x="160" y="100" width="400" height="160" rx="6"
        fill="url(#steelBody)"
        stroke="hsl(33 67% 67% / 0.35)"
        strokeWidth="1.4"
        className="hassler-body"
      />

      {/* Inner wall lines for steel thickness */}
      <rect
        x="172" y="112" width="376" height="136" rx="3"
        fill="none"
        stroke="hsl(33 67% 67% / 0.12)"
        strokeWidth="0.8"
        strokeDasharray="3 6"
      />

      {/* === CONFINING ANNULUS === */}
      <rect
        x="180" y="118" width="360" height="124" rx="2"
        fill="url(#confiningFluid)"
        stroke="hsl(200 40% 60% / 0.15)"
        strokeWidth="0.6"
      />

      {/* === CORE SAMPLE (center cylinder) === */}
      <rect
        x="230" y="148" width="260" height="64" rx="2"
        fill="url(#coreTexture)"
        stroke="hsl(33 67% 67% / 0.5)"
        strokeWidth="1.2"
        className="hassler-core"
      />
      {/* Core cross-hatching for rock texture */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`cx-${i}`}
          x1={240 + i * 21} y1={152}
          x2={240 + i * 21} y2={208}
          stroke="hsl(33 67% 67% / 0.06)"
          strokeWidth="0.5"
        />
      ))}

      {/* === RUBBER SLEEVE around core === */}
      <rect x="226" y="144" width="268" height="72" rx="3"
        fill="none"
        stroke="hsl(39 20% 50% / 0.25)"
        strokeWidth="1.6"
        strokeDasharray="8 4"
        className="hassler-sleeve"
      />

      {/* === END CAPS / DISTRIBUTORS === */}
      {/* Left end cap */}
      <rect x="195" y="138" width="38" height="84" rx="2"
        fill="hsl(39 10% 30% / 0.2)"
        stroke="hsl(33 67% 67% / 0.4)"
        strokeWidth="1.2"
      />
      {/* Left distributor channels */}
      {[155, 165, 175, 185, 195].map((y, i) => (
        <line key={`ld-${i}`} x1="198" y1={y} x2="230" y2={y}
          stroke="hsl(33 67% 67% / 0.15)" strokeWidth="0.6" />
      ))}

      {/* Right end cap */}
      <rect x="487" y="138" width="38" height="84" rx="2"
        fill="hsl(39 10% 30% / 0.2)"
        stroke="hsl(33 67% 67% / 0.4)"
        strokeWidth="1.2"
      />
      {/* Right distributor channels */}
      {[155, 165, 175, 185, 195].map((y, i) => (
        <line key={`rd-${i}`} x1="490" y1={y} x2="522" y2={y}
          stroke="hsl(33 67% 67% / 0.15)" strokeWidth="0.6" />
      ))}

      {/* === BOLTS on end caps === */}
      {[142, 160, 180, 200, 216].map((y, i) => (
        <g key={`lb-${i}`}>
          <circle cx="195" cy={y} r="3" fill="hsl(39 10% 35% / 0.3)"
            stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.8" />
        </g>
      ))}
      {[142, 160, 180, 200, 216].map((y, i) => (
        <g key={`rb-${i}`}>
          <circle cx="525" cy={y} r="3" fill="hsl(39 10% 35% / 0.3)"
            stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.8" />
        </g>
      ))}

      {/* === INLET PORT (left) === */}
      <line x1="100" y1="180" x2="195" y2="180"
        stroke="hsl(33 67% 67% / 0.5)" strokeWidth="1.4"
        markerEnd="url(#flowArrow)" className="hassler-flow-in" />
      {/* Inlet valve symbol */}
      <path d="M120,172 L128,180 L120,188" fill="none"
        stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />
      <path d="M136,172 L128,180 L136,188" fill="none"
        stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />

      {/* === OUTLET PORT (right) === */}
      <line x1="525" y1="180" x2="620" y2="180"
        stroke="hsl(33 67% 67% / 0.5)" strokeWidth="1.4"
        markerEnd="url(#flowArrow)" className="hassler-flow-out" />
      {/* Outlet valve symbol */}
      <path d="M584,172 L592,180 L584,188" fill="none"
        stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />
      <path d="M600,172 L592,180 L600,188" fill="none"
        stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />

      {/* === CONFINING PRESSURE PORT (top) === */}
      <line x1="360" y1="40" x2="360" y2="100"
        stroke="hsl(200 40% 60% / 0.4)" strokeWidth="1.2"
        markerEnd="url(#flowArrow)" className="hassler-confine" />
      {/* Pressure gauge symbol */}
      <circle cx="360" cy="32" r="12" fill="none"
        stroke="hsl(200 40% 60% / 0.35)" strokeWidth="1" />
      <line x1="360" y1="32" x2="366" y2="26"
        stroke="hsl(200 40% 60% / 0.5)" strokeWidth="1" />
      <text x="360" y="35" textAnchor="middle" fontSize="6"
        fill="hsl(200 40% 60% / 0.5)" fontFamily="monospace">P</text>

      {/* === DIFFERENTIAL PRESSURE TAPS === */}
      {/* Left tap */}
      <line x1="280" y1="260" x2="280" y2="212"
        stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
      <circle cx="280" cy="268" r="4" fill="none"
        stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.8" />
      <text x="280" y="270" textAnchor="middle" fontSize="5"
        fill="hsl(33 67% 67% / 0.4)" fontFamily="monospace">ΔP</text>
      {/* Right tap */}
      <line x1="440" y1="260" x2="440" y2="212"
        stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
      <circle cx="440" cy="268" r="4" fill="none"
        stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.8" />
      {/* Connecting line between taps */}
      <line x1="284" y1="268" x2="436" y2="268"
        stroke="hsl(33 67% 67% / 0.15)" strokeWidth="0.6" strokeDasharray="4 4" />

      {/* === LABELS === */}
      {/* Injection label */}
      <text x="80" y="168" textAnchor="middle" className="hassler-label"
        fontSize="7" fill="hsl(39 100% 94% / 0.5)" fontFamily="monospace"
        letterSpacing="0.08em">
        INJECTION
      </text>

      {/* Effluent label */}
      <text x="640" y="168" textAnchor="middle" className="hassler-label"
        fontSize="7" fill="hsl(39 100% 94% / 0.5)" fontFamily="monospace"
        letterSpacing="0.08em">
        EFFLUENT
      </text>

      {/* Confining pressure label */}
      <text x="400" y="18" textAnchor="middle" className="hassler-label"
        fontSize="7" fill="hsl(200 40% 60% / 0.5)" fontFamily="monospace"
        letterSpacing="0.08em">
        CONFINING
      </text>
      <text x="400" y="28" textAnchor="middle" className="hassler-label"
        fontSize="7" fill="hsl(200 40% 60% / 0.5)" fontFamily="monospace"
        letterSpacing="0.08em">
        PRESSURE
      </text>

      {/* Core sample label */}
      <text x="360" y="183" textAnchor="middle" className="hassler-label"
        fontSize="8" fill="hsl(33 67% 67% / 0.6)" fontFamily="monospace"
        letterSpacing="0.12em">
        CORE SAMPLE
      </text>

      {/* Rubber sleeve labels */}
      <text x="360" y="140" textAnchor="middle" className="hassler-label"
        fontSize="6" fill="hsl(39 20% 50% / 0.4)" fontFamily="monospace"
        letterSpacing="0.08em">
        RUBBER SLEEVE
      </text>

      {/* Steel vessel label */}
      <text x="360" y="96" textAnchor="middle" className="hassler-label"
        fontSize="6" fill="hsl(33 67% 67% / 0.3)" fontFamily="monospace"
        letterSpacing="0.08em">
        STEEL VESSEL
      </text>

      {/* Annulus label */}
      <text x="185" y="132" textAnchor="end" className="hassler-label"
        fontSize="5.5" fill="hsl(200 40% 60% / 0.35)" fontFamily="monospace"
        letterSpacing="0.06em" transform="rotate(-90, 185, 132)">
        ANNULUS
      </text>

      {/* ΔP label */}
      <text x="360" y="282" textAnchor="middle" className="hassler-label"
        fontSize="6.5" fill="hsl(33 67% 67% / 0.4)" fontFamily="monospace"
        letterSpacing="0.08em">
        DIFFERENTIAL PRESSURE
      </text>

      {/* === FLOW ANIMATION PARTICLES === */}
      {[0, 1, 2].map((i) => (
        <circle key={`fp-${i}`} r="1.5"
          fill="hsl(33 67% 67% / 0.5)"
          className="hassler-particle"
          style={{ animationDelay: `${i * 1.2}s` }}>
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            begin={`${i * 1.2}s`}
            path="M100,180 L525,180"
          />
        </circle>
      ))}

      {/* Confining pressure particles */}
      {[0, 1].map((i) => (
        <circle key={`cp-${i}`} r="1.2"
          fill="hsl(200 40% 60% / 0.4)"
          className="hassler-particle-conf">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            begin={`${i * 1.3}s`}
            path="M360,40 L360,100"
          />
        </circle>
      ))}

      <style>{`
        .hassler-svg .hassler-body,
        .hassler-svg .hassler-core,
        .hassler-svg .hassler-sleeve,
        .hassler-svg .hassler-flow-in,
        .hassler-svg .hassler-flow-out,
        .hassler-svg .hassler-confine,
        .hassler-svg .hassler-label {
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .hassler-svg.is-visible .hassler-body { opacity: 1; transition-delay: 0s; }
        .hassler-svg.is-visible .hassler-core { opacity: 1; transition-delay: 0.3s; }
        .hassler-svg.is-visible .hassler-sleeve { opacity: 1; transition-delay: 0.5s; }
        .hassler-svg.is-visible .hassler-flow-in { opacity: 1; transition-delay: 0.7s; }
        .hassler-svg.is-visible .hassler-flow-out { opacity: 1; transition-delay: 0.9s; }
        .hassler-svg.is-visible .hassler-confine { opacity: 1; transition-delay: 1.1s; }
        .hassler-svg.is-visible .hassler-label { opacity: 1; transition-delay: 1.3s; }

        .hassler-particle, .hassler-particle-conf {
          opacity: 0;
        }
        .hassler-svg.is-visible .hassler-particle,
        .hassler-svg.is-visible .hassler-particle-conf {
          opacity: 1;
          transition: opacity 0.5s ease 1.5s;
        }
      `}</style>
    </svg>
  );
};

export default HasslerCoreholderSVG;
