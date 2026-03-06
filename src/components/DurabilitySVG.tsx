import { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
}

const DurabilitySVG = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<'complex' | 'reducing' | 'simple'>('complex');
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle through phases
  useEffect(() => {
    if (!isVisible) return;
    const cycle = () => {
      setPhase('complex');
      timerRef.current = setTimeout(() => {
        setPhase('reducing');
        timerRef.current = setTimeout(() => {
          setPhase('simple');
          timerRef.current = setTimeout(cycle, 4000);
        }, 1500);
      }, 3000);
    };
    cycle();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isVisible]);

  const complexNodes: Node[] = [
    { x: 140, y: 80 }, { x: 220, y: 50 }, { x: 310, y: 75 },
    { x: 90, y: 160 }, { x: 200, y: 140 }, { x: 300, y: 150 },
    { x: 150, y: 230 }, { x: 260, y: 240 }, { x: 100, y: 260 },
    { x: 340, y: 230 }, { x: 230, y: 95 }, { x: 80, y: 100 },
    { x: 360, y: 130 }, { x: 180, y: 200 }, { x: 280, y: 190 },
  ];

  const complexEdges = [
    [0,1],[0,4],[0,3],[0,11],[1,2],[1,4],[1,10],[2,5],[2,10],[2,12],
    [3,4],[3,6],[3,8],[3,11],[4,5],[4,6],[4,7],[4,13],[5,7],[5,9],
    [5,12],[5,14],[6,7],[6,8],[6,13],[7,9],[7,14],[8,6],[10,4],[10,0],
    [11,0],[11,3],[11,8],[9,2],[9,12],[1,5],[3,7],[13,14],[13,6],[14,9],
  ];

  const simpleNodes: Node[] = [
    { x: 220, y: 90 },
    { x: 140, y: 175 },
    { x: 300, y: 175 },
    { x: 220, y: 260 },
  ];

  const simpleEdges = [
    [0,1],[0,2],[1,3],[2,3],
  ];

  const isReducingOrSimple = phase === 'reducing' || phase === 'simple';
  const isSimple = phase === 'simple';

  // Interpolate node positions
  const getNodePos = useCallback((complexIdx: number): Node => {
    if (!isReducingOrSimple) return complexNodes[complexIdx];
    // Map complex nodes to nearest simple node
    const mapping: Record<number, number> = {
      0: 0, 1: 0, 10: 0, 11: 0,
      2: 2, 5: 2, 12: 2, 14: 2,
      3: 1, 4: 1, 13: 1,
      6: 3, 7: 3, 8: 3, 9: 3,
    };
    const target = simpleNodes[mapping[complexIdx] ?? 0];
    return target;
  }, [isReducingOrSimple]);

  const phaseLabel = phase === 'complex' ? 'ENTROPY' : phase === 'reducing' ? 'REDUCING' : 'DURABILITY';
  const phaseLabelColor = phase === 'simple'
    ? 'hsl(33 67% 67% / 0.5)'
    : 'hsl(39 100% 94% / 0.2)';

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 340"
      className="w-full max-w-2xl mx-auto cursor-default"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="node-glow-d" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(33 67% 67% / 0.3)" />
          <stop offset="100%" stopColor="hsl(33 67% 67% / 0)" />
        </radialGradient>
        <filter id="gold-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Phase label */}
      <text x="220" y="25" textAnchor="middle"
        fill={phaseLabelColor} fontFamily="var(--font-sans)"
        fontSize="8" letterSpacing="0.25em"
        style={{ transition: 'fill 0.8s ease' }}>
        {phaseLabel}
      </text>

      {/* Edges */}
      {isSimple ? (
        // Simple edges with gold
        simpleEdges.map(([a, b], i) => (
          <line
            key={`se-${i}`}
            x1={simpleNodes[a].x} y1={simpleNodes[a].y}
            x2={simpleNodes[b].x} y2={simpleNodes[b].y}
            stroke="hsl(33 67% 67% / 0.35)"
            strokeWidth={1.4}
            style={{ transition: 'all 0.8s ease' }}
          />
        ))
      ) : (
        // Complex edges that collapse
        complexEdges.map(([a, b], i) => {
          const posA = getNodePos(a);
          const posB = getNodePos(b);
          return (
            <line
              key={`ce-${i}`}
              x1={posA.x} y1={posA.y}
              x2={posB.x} y2={posB.y}
              stroke={isReducingOrSimple ? 'hsl(33 67% 67% / 0.08)' : 'hsl(39 100% 94% / 0.06)'}
              strokeWidth={0.7}
              className={isVisible ? 'opacity-100' : 'opacity-0'}
              style={{ transition: 'all 1.2s cubic-bezier(.22,.61,.36,1)' }}
            />
          );
        })
      )}

      {/* Nodes */}
      {isSimple ? (
        // Simple nodes with glow
        simpleNodes.map((node, i) => (
          <g key={`sn-${i}`}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: 'pointer' }}>
            {/* Glow */}
            <circle cx={node.x} cy={node.y} r={hoveredNode === i ? 20 : 14}
              fill="url(#node-glow-d)"
              style={{ transition: 'r 0.3s ease' }} />
            {/* Outer ring */}
            <circle cx={node.x} cy={node.y} r={hoveredNode === i ? 8 : 5.5}
              fill="hsl(33 67% 67% / 0.1)"
              stroke="hsl(33 67% 67% / 0.6)"
              strokeWidth={1.4}
              style={{ transition: 'all 0.3s ease' }} />
            {/* Core */}
            <circle cx={node.x} cy={node.y} r={2}
              fill="hsl(33 67% 67% / 0.9)" />
          </g>
        ))
      ) : (
        // Complex nodes that migrate
        complexNodes.map((_, i) => {
          const pos = getNodePos(i);
          return (
            <circle
              key={`cn-${i}`}
              cx={pos.x} cy={pos.y} r={2}
              fill="hsl(39 100% 94% / 0.15)"
              stroke="hsl(39 100% 94% / 0.25)"
              strokeWidth={0.6}
              className={isVisible ? 'opacity-100' : 'opacity-0'}
              style={{ transition: 'all 1.2s cubic-bezier(.22,.61,.36,1)' }}
            />
          );
        })
      )}

      {/* Simple structure outer ring (only in simple phase) */}
      {isSimple && (
        <circle cx="220" cy="175" r="110"
          fill="none" stroke="hsl(33 67% 67% / 0.04)" strokeWidth={0.8}
          className="animate-pulse-subtle" />
      )}

      {/* Bottom caption */}
      <text x="220" y="330" textAnchor="middle"
        fill="hsl(39 100% 94% / 0.12)" fontFamily="var(--font-sans)"
        fontSize="5.5" letterSpacing="0.15em">
        {isSimple ? 'LOAD BEARING STRUCTURE' : 'OBSERVE THE REDUCTION'}
      </text>
    </svg>
  );
};

export default DurabilitySVG;
