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
      { threshold: 0.2 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 960 580"
      className="w-full h-auto hassler-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="steelBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(39 10% 40%)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="hsl(39 10% 25%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(39 10% 40%)" stopOpacity="0.25" />
        </linearGradient>
        <pattern id="coreTexture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.8" fill="hsl(33 67% 67% / 0.15)" />
        </pattern>
        <linearGradient id="confiningFluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(200 40% 50%)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(200 40% 50%)" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="pumpBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(33 67% 67%)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(33 67% 67%)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="accumBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(150 30% 45%)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="hsl(150 30% 45%)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="fluidFillOil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(33 67% 67%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(33 67% 67%)" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="fluidFillChem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(150 40% 55%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(150 40% 55%)" stopOpacity="0.08" />
        </linearGradient>
        <marker id="flowArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="hsl(33 67% 67% / 0.6)" />
        </marker>
        <marker id="flowArrowGreen" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0,0 L6,2 L0,4" fill="hsl(150 40% 55% / 0.6)" />
        </marker>
      </defs>

      {/* Faint grid */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`vg-${i}`} x1={i * 96} y1={0} x2={i * 96} y2={520}
          stroke="hsl(39 100% 94% / 0.02)" strokeWidth={0.5} />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`hg-${i}`} x1={0} y1={i * 86} x2={960} y2={i * 86}
          stroke="hsl(39 100% 94% / 0.02)" strokeWidth={0.5} />
      ))}

      {/* ============================================ */}
      {/* === ISCO SYRINGE PUMP (far left) === */}
      {/* ============================================ */}
      <g className="hassler-pump">
        {/* Pump body */}
        <rect x="20" y="195" width="80" height="90" rx="4"
          fill="url(#pumpBody)" stroke="hsl(33 67% 67% / 0.35)" strokeWidth="1.4" />
        {/* Pump cylinder */}
        <rect x="32" y="210" width="56" height="30" rx="2"
          fill="hsl(33 67% 67% / 0.06)" stroke="hsl(33 67% 67% / 0.2)" strokeWidth="0.8" />
        {/* Piston */}
        <rect x="32" y="222" width="28" height="6" rx="1"
          fill="hsl(33 67% 67% / 0.25)" stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.6" />
        {/* Motor lines */}
        {[252, 260, 268, 276].map((y, i) => (
          <line key={`ml-${i}`} x1="36" y1={y} x2="92" y2={y}
            stroke="hsl(33 67% 67% / 0.1)" strokeWidth="0.5" />
        ))}
        {/* Digital display */}
        <rect x="40" y="248" width="40" height="14" rx="1"
          fill="hsl(33 67% 67% / 0.04)" stroke="hsl(33 67% 67% / 0.15)" strokeWidth="0.6" />
        <text x="60" y="258" textAnchor="middle" fontSize="5"
          fill="hsl(33 67% 67% / 0.5)" fontFamily="monospace">0.5 mL/min</text>
        {/* Label */}
        <text x="60" y="302" textAnchor="middle" className="hassler-label"
          fontSize="6.5" fill="hsl(39 100% 94% / 0.5)" fontFamily="monospace" letterSpacing="0.08em">
          ISCO PUMP
        </text>
        <text x="60" y="312" textAnchor="middle" className="hassler-label"
          fontSize="5" fill="hsl(39 100% 94% / 0.3)" fontFamily="monospace" letterSpacing="0.06em">
          CONSTANT RATE
        </text>
      </g>

      {/* Pump output line → accumulator area */}
      <line x1="100" y1="240" x2="135" y2="240"
        stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2"
        markerEnd="url(#flowArrow)" className="hassler-flow-in" />

      {/* ============================================ */}
      {/* === FLUID ACCUMULATORS (2 stacked) === */}
      {/* ============================================ */}
      <g className="hassler-accum">
        {/* Oil accumulator */}
        <rect x="140" y="165" width="50" height="70" rx="4"
          fill="url(#fluidFillOil)" stroke="hsl(33 67% 67% / 0.35)" strokeWidth="1.4" />
        {/* Fluid level */}
        <rect x="142" y="195" width="46" height="38" rx="2"
          fill="hsl(33 67% 67% / 0.1)" />
        {/* Piston line */}
        <line x1="145" y1="195" x2="185" y2="195"
          stroke="hsl(33 67% 67% / 0.3)" strokeWidth="1" />
        <text x="165" y="185" textAnchor="middle" className="hassler-label"
          fontSize="5" fill="hsl(33 67% 67% / 0.5)" fontFamily="monospace" letterSpacing="0.06em">
          OIL
        </text>
        <text x="165" y="158" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(39 100% 94% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          ACCUMULATOR
        </text>

        {/* Chemical accumulator */}
        <rect x="140" y="260" width="50" height="70" rx="4"
          fill="url(#fluidFillChem)" stroke="hsl(150 40% 55% / 0.35)" strokeWidth="1.4" />
        {/* Fluid level */}
        <rect x="142" y="290" width="46" height="38" rx="2"
          fill="hsl(150 40% 55% / 0.1)" />
        {/* Piston line */}
        <line x1="145" y1="290" x2="185" y2="290"
          stroke="hsl(150 40% 55% / 0.3)" strokeWidth="1" />
        <text x="165" y="280" textAnchor="middle" className="hassler-label"
          fontSize="5" fill="hsl(150 40% 55% / 0.5)" fontFamily="monospace" letterSpacing="0.06em">
          ASP
        </text>
        <text x="165" y="348" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(39 100% 94% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          CHEMICAL
        </text>
      </g>

      {/* === 3-WAY VALVE between accumulators and coreholder === */}
      <g className="hassler-valve">
        {/* Oil line out */}
        <line x1="190" y1="200" x2="230" y2="200"
          stroke="hsl(33 67% 67% / 0.35)" strokeWidth="1" />
        <line x1="230" y1="200" x2="245" y2="240"
          stroke="hsl(33 67% 67% / 0.35)" strokeWidth="1" />
        {/* Chem line out */}
        <line x1="190" y1="295" x2="230" y2="295"
          stroke="hsl(150 40% 55% / 0.35)" strokeWidth="1" />
        <line x1="230" y1="295" x2="245" y2="240"
          stroke="hsl(150 40% 55% / 0.35)" strokeWidth="1" />
        {/* Valve body */}
        <polygon points="237,230 253,230 253,250 237,250"
          fill="hsl(33 67% 67% / 0.08)" stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />
        <text x="245" y="262" textAnchor="middle" className="hassler-label"
          fontSize="5" fill="hsl(39 100% 94% / 0.4)" fontFamily="monospace" letterSpacing="0.06em">
          3-WAY
        </text>
        {/* Line from valve to coreholder */}
        <line x1="253" y1="240" x2="310" y2="240"
          stroke="hsl(33 67% 67% / 0.45)" strokeWidth="1.4"
          markerEnd="url(#flowArrow)" className="hassler-flow-in" />
      </g>

      {/* === INLINE PRESSURE TRANSDUCER === */}
      <g className="hassler-label">
        <circle cx="280" cy="240" r="8" fill="none"
          stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.8" />
        <text x="280" y="243" textAnchor="middle" fontSize="5.5"
          fill="hsl(33 67% 67% / 0.5)" fontFamily="monospace">Pi</text>
        <text x="280" y="228" textAnchor="middle" fontSize="4.5"
          fill="hsl(39 100% 94% / 0.3)" fontFamily="monospace" letterSpacing="0.06em">
          INLET P
        </text>
      </g>

      {/* ============================================ */}
      {/* === MAIN COREHOLDER VESSEL (center) === */}
      {/* ============================================ */}
      <g className="hassler-body">
        {/* Outer steel cylinder */}
        <rect x="320" y="175" width="300" height="130" rx="6"
          fill="url(#steelBody)" stroke="hsl(33 67% 67% / 0.35)" strokeWidth="1.4" />
        {/* Inner wall */}
        <rect x="330" y="185" width="280" height="110" rx="3"
          fill="none" stroke="hsl(33 67% 67% / 0.12)" strokeWidth="0.8" strokeDasharray="3 6" />
      </g>

      {/* Confining annulus */}
      <g className="hassler-sleeve">
        <rect x="336" y="190" width="268" height="100" rx="2"
          fill="url(#confiningFluid)" stroke="hsl(200 40% 60% / 0.15)" strokeWidth="0.6" />
      </g>

      {/* Core sample */}
      <g className="hassler-core">
        <rect x="375" y="215" width="190" height="50" rx="2"
          fill="url(#coreTexture)" stroke="hsl(33 67% 67% / 0.5)" strokeWidth="1.2" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`cx-${i}`} x1={385 + i * 20} y1={219} x2={385 + i * 20} y2={261}
            stroke="hsl(33 67% 67% / 0.06)" strokeWidth="0.5" />
        ))}
      </g>

      {/* Rubber sleeve */}
      <g className="hassler-sleeve">
        <rect x="371" y="211" width="198" height="58" rx="3"
          fill="none" stroke="hsl(39 20% 50% / 0.25)" strokeWidth="1.6" strokeDasharray="8 4" />
      </g>

      {/* End caps */}
      <g className="hassler-body">
        <rect x="342" y="208" width="32" height="64" rx="2"
          fill="hsl(39 10% 30% / 0.2)" stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />
        <rect x="566" y="208" width="32" height="64" rx="2"
          fill="hsl(39 10% 30% / 0.2)" stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2" />
        {/* Bolts */}
        {[214, 228, 242, 256, 266].map((y, i) => (
          <g key={`bolts-${i}`}>
            <circle cx="342" cy={y} r="2.5" fill="hsl(39 10% 35% / 0.3)"
              stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.6" />
            <circle cx="598" cy={y} r="2.5" fill="hsl(39 10% 35% / 0.3)"
              stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.6" />
          </g>
        ))}
      </g>

      {/* === CONFINING PRESSURE SYSTEM (top) === */}
      <g className="hassler-confine">
        <line x1="470" y1="110" x2="470" y2="175"
          stroke="hsl(200 40% 60% / 0.4)" strokeWidth="1.2" markerEnd="url(#flowArrow)" />
        {/* Hydraulic hand pump */}
        <rect x="445" y="68" width="50" height="36" rx="3"
          fill="hsl(200 40% 50% / 0.06)" stroke="hsl(200 40% 60% / 0.3)" strokeWidth="1" />
        <circle cx="470" cy="82" r="10" fill="none"
          stroke="hsl(200 40% 60% / 0.3)" strokeWidth="0.8" />
        <line x1="470" y1="82" x2="477" y2="76"
          stroke="hsl(200 40% 60% / 0.5)" strokeWidth="0.8" />
        <text x="470" y="85" textAnchor="middle" fontSize="5"
          fill="hsl(200 40% 60% / 0.5)" fontFamily="monospace">P</text>
        <text x="470" y="60" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(200 40% 60% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          CONFINING
        </text>
        <text x="470" y="50" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(200 40% 60% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          OVERBURDEN
        </text>
      </g>

      {/* Coreholder labels */}
      <g className="hassler-label">
        <text x="470" y="243" textAnchor="middle"
          fontSize="7.5" fill="hsl(33 67% 67% / 0.6)" fontFamily="monospace" letterSpacing="0.12em">
          CORE SAMPLE
        </text>
        <text x="470" y="206" textAnchor="middle"
          fontSize="5.5" fill="hsl(39 20% 50% / 0.4)" fontFamily="monospace" letterSpacing="0.08em">
          RUBBER SLEEVE
        </text>
        <text x="470" y="170" textAnchor="middle"
          fontSize="5.5" fill="hsl(33 67% 67% / 0.3)" fontFamily="monospace" letterSpacing="0.08em">
          HASSLER STEEL VESSEL
        </text>
      </g>

      {/* === DIFFERENTIAL PRESSURE TAPS === */}
      <g className="hassler-label">
        <line x1="420" y1="265" x2="420" y2="290"
          stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="520" y1="265" x2="520" y2="290"
          stroke="hsl(33 67% 67% / 0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="420" y1="290" x2="520" y2="290"
          stroke="hsl(33 67% 67% / 0.15)" strokeWidth="0.6" strokeDasharray="4 4" />
        <circle cx="470" cy="290" r="6" fill="none"
          stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.8" />
        <text x="470" y="293" textAnchor="middle" fontSize="5.5"
          fill="hsl(33 67% 67% / 0.5)" fontFamily="monospace">ΔP</text>
        <text x="470" y="308" textAnchor="middle"
          fontSize="5.5" fill="hsl(33 67% 67% / 0.35)" fontFamily="monospace" letterSpacing="0.06em">
          DIFF. PRESSURE
        </text>
      </g>

      {/* === OUTLET LINE & BPR === */}
      <g className="hassler-flow-out">
        <line x1="598" y1="240" x2="660" y2="240"
          stroke="hsl(33 67% 67% / 0.45)" strokeWidth="1.4" markerEnd="url(#flowArrow)" />
        {/* Outlet pressure transducer */}
        <circle cx="630" cy="240" r="8" fill="none"
          stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.8" />
        <text x="630" y="243" textAnchor="middle" fontSize="5.5"
          fill="hsl(33 67% 67% / 0.5)" fontFamily="monospace">Po</text>
        <text x="630" y="228" textAnchor="middle" className="hassler-label"
          fontSize="4.5" fill="hsl(39 100% 94% / 0.3)" fontFamily="monospace">OUTLET P</text>
      </g>

      {/* Back Pressure Regulator */}
      <g className="hassler-bpr">
        <rect x="670" y="218" width="55" height="44" rx="4"
          fill="hsl(33 67% 67% / 0.06)" stroke="hsl(33 67% 67% / 0.35)" strokeWidth="1.2" />
        {/* Spring symbol inside */}
        <path d="M682,232 L688,228 L694,236 L700,228 L706,236 L712,232"
          fill="none" stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.8" />
        {/* Valve seat */}
        <line x1="690" y1="248" x2="704" y2="248"
          stroke="hsl(33 67% 67% / 0.25)" strokeWidth="1" />
        <circle cx="697" cy="248" r="2" fill="hsl(33 67% 67% / 0.2)"
          stroke="hsl(33 67% 67% / 0.3)" strokeWidth="0.6" />
        <text x="697" y="275" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(39 100% 94% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          BPR
        </text>
        <text x="697" y="285" textAnchor="middle" className="hassler-label"
          fontSize="5" fill="hsl(39 100% 94% / 0.3)" fontFamily="monospace" letterSpacing="0.06em">
          BACK PRESSURE
        </text>
      </g>

      {/* BPR → Effluent collection */}
      <line x1="725" y1="240" x2="770" y2="240"
        stroke="hsl(33 67% 67% / 0.4)" strokeWidth="1.2"
        markerEnd="url(#flowArrow)" className="hassler-flow-out" />

      {/* ============================================ */}
      {/* === FRACTION COLLECTOR (far right) === */}
      {/* ============================================ */}
      <g className="hassler-collector">
        {/* Collector body */}
        <rect x="775" y="200" width="80" height="80" rx="4"
          fill="hsl(33 67% 67% / 0.04)" stroke="hsl(33 67% 67% / 0.3)" strokeWidth="1.2" />
        {/* Test tubes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`tube-${i}`}>
            <rect x={788 + i * 12} y={220} width={6} height={20} rx="1"
              fill="hsl(33 67% 67% / 0.06)" stroke="hsl(33 67% 67% / 0.2)" strokeWidth="0.6" />
            {/* Fluid level in each tube (decreasing) */}
            <rect x={789 + i * 12} y={228 + i * 2} width={4} height={12 - i * 2} rx="0.5"
              fill={`hsl(33 67% 67% / ${0.15 - i * 0.02})`} />
          </g>
        ))}
        {/* Drip line */}
        <line x1="800" y1="240" x2="800" y2="218"
          stroke="hsl(33 67% 67% / 0.2)" strokeWidth="0.6" strokeDasharray="2 2" />
        <text x="815" y="295" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(39 100% 94% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          FRACTION
        </text>
        <text x="815" y="305" textAnchor="middle" className="hassler-label"
          fontSize="6" fill="hsl(39 100% 94% / 0.45)" fontFamily="monospace" letterSpacing="0.08em">
          COLLECTOR
        </text>
      </g>

      {/* ============================================ */}
      {/* === DATA ACQUISITION (bottom strip) === */}
      {/* ============================================ */}
      <g className="hassler-label">
        {/* DAQ line */}
        <line x1="280" y1="340" x2="815" y2="340"
          stroke="hsl(33 67% 67% / 0.1)" strokeWidth="0.6" strokeDasharray="6 4" />
        {/* Connection lines from sensors */}
        <line x1="280" y1="248" x2="280" y2="340"
          stroke="hsl(33 67% 67% / 0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="470" y1="296" x2="470" y2="340"
          stroke="hsl(33 67% 67% / 0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="630" y1="248" x2="630" y2="340"
          stroke="hsl(33 67% 67% / 0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
        {/* DAQ box */}
        <rect x="420" y="350" width="100" height="28" rx="3"
          fill="hsl(33 67% 67% / 0.04)" stroke="hsl(33 67% 67% / 0.2)" strokeWidth="0.8" />
        <text x="470" y="367" textAnchor="middle"
          fontSize="6" fill="hsl(39 100% 94% / 0.45)" fontFamily="monospace" letterSpacing="0.1em">
          DATA ACQUISITION
        </text>
      </g>

      {/* ============================================ */}
      {/* === EXPERIENCE TIMELINE (bottom) === */}
      {/* ============================================ */}
      <g className="hassler-label">
        {/* Background panel */}
        <rect x="40" y="400" width="880" height="160" rx="5"
          fill="hsl(33 67% 67% / 0.02)" stroke="hsl(33 67% 67% / 0.1)" strokeWidth="0.8" />
        {/* Timeline title */}
        <text x="480" y="428" textAnchor="middle"
          fontSize="10" fill="hsl(33 67% 67% / 0.5)" fontFamily="monospace"
          letterSpacing="0.2em" fontWeight="600">
          ENGINEERING RECORD
        </text>
        {/* Main timeline line */}
        <line x1="80" y1="465" x2="880" y2="465"
          stroke="hsl(33 67% 67% / 0.25)" strokeWidth="1.4" />
        {/* Timeline markers */}
        {[
          { x: 110, label: '50+ EOR', sub: 'System Designs' },
          { x: 270, label: 'ASP / SP', sub: 'Polymer Floods' },
          { x: 420, label: '5 SPE', sub: 'Published Papers' },
          { x: 570, label: 'Kuwait', sub: 'Pilot QC' },
          { x: 720, label: '10+ Years', sub: 'Coreflood Programs' },
          { x: 860, label: 'Intl.', sub: 'Deployment' },
        ].map((item, i) => (
          <g key={`tm-${i}`}>
            <circle cx={item.x} cy={465} r="5" fill="hsl(33 67% 67% / 0.2)"
              stroke="hsl(33 67% 67% / 0.6)" strokeWidth="1.2" />
            <text x={item.x} y={490} textAnchor="middle"
              fontSize="11" fill="hsl(33 67% 67% / 0.75)" fontFamily="monospace"
              fontWeight="700" letterSpacing="0.06em">
              {item.label}
            </text>
            <text x={item.x} y={508} textAnchor="middle"
              fontSize="8.5" fill="hsl(39 100% 94% / 0.4)" fontFamily="monospace"
              letterSpacing="0.04em">
              {item.sub}
            </text>
          </g>
        ))}
      </g>

      {/* === FLOW ANIMATION PARTICLES === */}
      {/* Injection line particles */}
      {[0, 1, 2].map((i) => (
        <circle key={`fp-${i}`} r="1.5"
          fill="hsl(33 67% 67% / 0.5)"
          className="hassler-particle">
          <animateMotion
            dur="4s" repeatCount="indefinite" begin={`${i * 1.3}s`}
            path="M253,240 L375,240 L565,240 L598,240"
          />
        </circle>
      ))}

      {/* Effluent particles */}
      {[0, 1].map((i) => (
        <circle key={`ep-${i}`} r="1.2"
          fill="hsl(33 67% 67% / 0.35)"
          className="hassler-particle">
          <animateMotion
            dur="2.5s" repeatCount="indefinite" begin={`${i * 1.2}s`}
            path="M660,240 L770,240"
          />
        </circle>
      ))}

      {/* Confining pressure particles */}
      {[0, 1].map((i) => (
        <circle key={`cp-${i}`} r="1.2"
          fill="hsl(200 40% 60% / 0.4)"
          className="hassler-particle-conf">
          <animateMotion
            dur="2.5s" repeatCount="indefinite" begin={`${i * 1.3}s`}
            path="M470,104 L470,175"
          />
        </circle>
      ))}

      <style>{`
        .hassler-svg .hassler-body,
        .hassler-svg .hassler-core,
        .hassler-svg .hassler-sleeve,
        .hassler-svg .hassler-pump,
        .hassler-svg .hassler-accum,
        .hassler-svg .hassler-valve,
        .hassler-svg .hassler-confine,
        .hassler-svg .hassler-bpr,
        .hassler-svg .hassler-collector,
        .hassler-svg .hassler-flow-in,
        .hassler-svg .hassler-flow-out,
        .hassler-svg .hassler-label {
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .hassler-svg.is-visible .hassler-pump { opacity: 1; transition-delay: 0s; }
        .hassler-svg.is-visible .hassler-accum { opacity: 1; transition-delay: 0.2s; }
        .hassler-svg.is-visible .hassler-valve { opacity: 1; transition-delay: 0.4s; }
        .hassler-svg.is-visible .hassler-flow-in { opacity: 1; transition-delay: 0.5s; }
        .hassler-svg.is-visible .hassler-body { opacity: 1; transition-delay: 0.6s; }
        .hassler-svg.is-visible .hassler-core { opacity: 1; transition-delay: 0.8s; }
        .hassler-svg.is-visible .hassler-sleeve { opacity: 1; transition-delay: 0.9s; }
        .hassler-svg.is-visible .hassler-confine { opacity: 1; transition-delay: 1.0s; }
        .hassler-svg.is-visible .hassler-bpr { opacity: 1; transition-delay: 1.1s; }
        .hassler-svg.is-visible .hassler-flow-out { opacity: 1; transition-delay: 1.2s; }
        .hassler-svg.is-visible .hassler-collector { opacity: 1; transition-delay: 1.3s; }
        .hassler-svg.is-visible .hassler-label { opacity: 1; transition-delay: 1.5s; }

        .hassler-particle, .hassler-particle-conf {
          opacity: 0;
        }
        .hassler-svg.is-visible .hassler-particle,
        .hassler-svg.is-visible .hassler-particle-conf {
          opacity: 1;
          transition: opacity 0.5s ease 1.8s;
        }
      `}</style>
    </svg>
  );
};

export default HasslerCoreholderSVG;
