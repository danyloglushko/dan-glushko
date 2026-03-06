import { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  label: string;
  durable: boolean;
}

interface Edge {
  from: number;
  to: number;
  strength: number; // 0-1, higher = more durable
}

const NODES: Node[] = [
  // Durable core (4 nodes)
  { x: 250, y: 110, label: 'Core', durable: true },
  { x: 410, y: 110, label: 'Engine', durable: true },
  { x: 250, y: 230, label: 'Store', durable: true },
  { x: 410, y: 230, label: 'Output', durable: true },
  // Fragile periphery
  { x: 80, y: 60, label: 'Sync', durable: false },
  { x: 160, y: 40, label: 'Proxy', durable: false },
  { x: 330, y: 30, label: 'Cache', durable: false },
  { x: 500, y: 50, label: 'Mirror', durable: false },
  { x: 580, y: 100, label: 'Bridge', durable: false },
  { x: 580, y: 200, label: 'Shim', durable: false },
  { x: 500, y: 280, label: 'Adapter', durable: false },
  { x: 330, y: 300, label: 'Mapper', durable: false },
  { x: 160, y: 290, label: 'Wrapper', durable: false },
  { x: 80, y: 200, label: 'Hook', durable: false },
  { x: 80, y: 130, label: 'Patch', durable: false },
  { x: 160, y: 160, label: 'Glue', durable: false },
  { x: 500, y: 160, label: 'Pipe', durable: false },
  { x: 330, y: 170, label: 'Relay', durable: false },
  { x: 420, y: 300, label: 'Buffer', durable: false },
  { x: 140, y: 110, label: 'Layer', durable: false },
];

const EDGES: Edge[] = [
  // Durable connections (core skeleton)
  { from: 0, to: 1, strength: 1 },
  { from: 1, to: 3, strength: 1 },
  { from: 0, to: 2, strength: 1 },
  { from: 2, to: 3, strength: 1 },
  { from: 0, to: 3, strength: 0.95 },
  { from: 1, to: 2, strength: 0.95 },
  // Medium connections
  { from: 0, to: 17, strength: 0.5 },
  { from: 1, to: 17, strength: 0.5 },
  { from: 2, to: 17, strength: 0.45 },
  { from: 3, to: 17, strength: 0.45 },
  { from: 0, to: 15, strength: 0.4 },
  { from: 1, to: 16, strength: 0.4 },
  // Fragile connections
  { from: 4, to: 5, strength: 0.2 },
  { from: 5, to: 0, strength: 0.25 },
  { from: 5, to: 6, strength: 0.15 },
  { from: 6, to: 1, strength: 0.2 },
  { from: 6, to: 7, strength: 0.15 },
  { from: 7, to: 8, strength: 0.2 },
  { from: 8, to: 1, strength: 0.25 },
  { from: 8, to: 9, strength: 0.2 },
  { from: 9, to: 16, strength: 0.15 },
  { from: 9, to: 10, strength: 0.2 },
  { from: 10, to: 3, strength: 0.25 },
  { from: 10, to: 18, strength: 0.15 },
  { from: 11, to: 2, strength: 0.2 },
  { from: 11, to: 18, strength: 0.15 },
  { from: 12, to: 2, strength: 0.25 },
  { from: 12, to: 11, strength: 0.2 },
  { from: 13, to: 14, strength: 0.2 },
  { from: 14, to: 0, strength: 0.25 },
  { from: 13, to: 15, strength: 0.15 },
  { from: 15, to: 17, strength: 0.15 },
  { from: 4, to: 14, strength: 0.15 },
  { from: 4, to: 19, strength: 0.2 },
  { from: 19, to: 0, strength: 0.3 },
  { from: 19, to: 5, strength: 0.15 },
  { from: 16, to: 3, strength: 0.3 },
  { from: 7, to: 16, strength: 0.15 },
  { from: 13, to: 12, strength: 0.2 },
  { from: 10, to: 11, strength: 0.15 },
];

const PRESSURE_RADIUS = 120;
const NODE_W = 52;
const NODE_H = 22;

const DurabilitySVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [brokenEdges, setBrokenEdges] = useState<Set<number>>(new Set());
  const [hasInteracted, setHasInteracted] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 660 / rect.width;
    const scaleY = 340 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setMouse({ x, y });

    if (!hasInteracted) setHasInteracted(true);

    // Break fragile edges near cursor
    setBrokenEdges(prev => {
      const next = new Set(prev);
      EDGES.forEach((edge, i) => {
        if (next.has(i)) return;
        if (edge.strength >= 0.9) return; // durable edges never break
        const midX = (NODES[edge.from].x + NODES[edge.to].x) / 2;
        const midY = (NODES[edge.from].y + NODES[edge.to].y) / 2;
        const dist = Math.hypot(x - midX, y - midY);
        // Weaker edges break from further away
        const breakDist = PRESSURE_RADIUS * (1 - edge.strength);
        if (dist < breakDist) {
          next.add(i);
        }
      });
      return next;
    });

    // Reset timer
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setBrokenEdges(new Set());
      setMouse(null);
    }, 3000);
  }, [hasInteracted]);

  const handleMouseLeave = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setBrokenEdges(new Set());
      setMouse(null);
    }, 2500);
  }, []);

  // Count surviving connections per node
  const nodeAlive = NODES.map((_, ni) => {
    return EDGES.some((edge, ei) =>
      !brokenEdges.has(ei) && (edge.from === ni || edge.to === ni)
    );
  });

  const totalEdges = EDGES.length;
  const survivingEdges = totalEdges - brokenEdges.size;
  const ratio = survivingEdges / totalEdges;

  const statusLabel = !hasInteracted
    ? 'MOVE CURSOR TO APPLY PRESSURE'
    : ratio > 0.7
    ? 'SYSTEM INTACT'
    : ratio > 0.4
    ? 'STRESS DETECTED'
    : ratio > 0.2
    ? 'NON-ESSENTIAL SHEDDING'
    : 'DURABLE CORE REMAINS';

  const statusColor = !hasInteracted
    ? 'hsl(39 100% 94% / 0.15)'
    : ratio > 0.7
    ? 'hsl(39 100% 94% / 0.2)'
    : ratio > 0.4
    ? 'hsl(45 80% 60% / 0.35)'
    : ratio > 0.2
    ? 'hsl(33 67% 67% / 0.4)'
    : 'hsl(33 67% 67% / 0.55)';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 660 340"
      className="w-full max-w-4xl mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'crosshair' }}
    >
      <defs>
        <radialGradient id="pressure-field" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(0 60% 50% / 0.06)" />
          <stop offset="60%" stopColor="hsl(33 67% 67% / 0.03)" />
          <stop offset="100%" stopColor="hsl(33 67% 67% / 0)" />
        </radialGradient>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Status label */}
      <text x="330" y="18" textAnchor="middle"
        fill={statusColor} fontFamily="monospace"
        fontSize="7" letterSpacing="0.2em"
        style={{ transition: 'fill 0.5s ease' }}>
        {statusLabel}
      </text>

      {/* Pressure field indicator */}
      {mouse && (
        <circle cx={mouse.x} cy={mouse.y} r={PRESSURE_RADIUS}
          fill="url(#pressure-field)"
          style={{ transition: 'cx 0.05s, cy 0.05s' }} />
      )}

      {/* Edges */}
      {EDGES.map((edge, i) => {
        const broken = brokenEdges.has(i);
        const isDurable = edge.strength >= 0.9;
        const fromNode = NODES[edge.from];
        const toNode = NODES[edge.to];

        // Calculate proximity to cursor for glow effect
        let proximity = 0;
        if (mouse && isDurable) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          const dist = Math.hypot(mouse.x - midX, mouse.y - midY);
          proximity = Math.max(0, 1 - dist / PRESSURE_RADIUS);
        }

        const baseAlpha = isDurable ? 0.35 : edge.strength * 0.3 + 0.05;
        const strokeColor = broken
          ? 'hsl(0 60% 50% / 0)'
          : isDurable && proximity > 0
          ? `hsl(33 67% 67% / ${0.35 + proximity * 0.45})`
          : `hsl(39 100% 94% / ${baseAlpha})`;

        return (
          <line key={`e-${i}`}
            x1={fromNode.x} y1={fromNode.y}
            x2={toNode.x} y2={toNode.y}
            stroke={strokeColor}
            strokeWidth={isDurable ? 1.4 + proximity * 0.8 : 0.6}
            strokeDasharray={broken ? '2 4' : 'none'}
            style={{
              transition: broken
                ? 'stroke 0.6s ease, stroke-dasharray 0.3s ease'
                : 'stroke 0.15s ease, stroke-width 0.15s ease',
              opacity: isVisible ? 1 : 0,
            }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const alive = nodeAlive[i];
        const isDurable = node.durable;
        const fading = !alive && !isDurable && hasInteracted;

        // Proximity glow for durable nodes
        let proximity = 0;
        if (mouse && isDurable) {
          const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          proximity = Math.max(0, 1 - dist / PRESSURE_RADIUS);
        }

        const nodeOpacity = fading ? 0.08 : isVisible ? 1 : 0;
        const strokeAlpha = isDurable
          ? 0.5 + proximity * 0.4
          : fading ? 0.05 : 0.2;
        const fillAlpha = isDurable
          ? 0.06 + proximity * 0.08
          : fading ? 0.01 : 0.03;
        const textAlpha = isDurable
          ? 0.6 + proximity * 0.3
          : fading ? 0.03 : 0.3;

        const strokeColor = isDurable
          ? `hsl(33 67% 67% / ${strokeAlpha})`
          : `hsl(39 100% 94% / ${strokeAlpha})`;
        const fillColor = isDurable
          ? `hsl(33 67% 67% / ${fillAlpha})`
          : `hsl(39 100% 94% / ${fillAlpha})`;

        return (
          <g key={`n-${i}`}
            style={{
              opacity: nodeOpacity,
              transition: fading
                ? 'opacity 1s ease 0.3s'
                : 'opacity 0.8s ease',
            }}>
            {/* Glow behind durable nodes under pressure */}
            {isDurable && proximity > 0.3 && (
              <rect
                x={node.x - NODE_W / 2 - 6} y={node.y - NODE_H / 2 - 6}
                width={NODE_W + 12} height={NODE_H + 12}
                rx={8} fill={`hsl(33 67% 67% / ${proximity * 0.1})`}
                filter="url(#glow-strong)"
              />
            )}
            <rect
              x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
              width={NODE_W} height={NODE_H}
              rx={isDurable ? 4 : 3}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={isDurable ? 1.4 : 0.7}
              style={{ transition: 'all 0.2s ease' }}
            />
            {/* Connector dots */}
            <circle cx={node.x - NODE_W / 2} cy={node.y} r={1.5}
              fill={strokeColor} style={{ transition: 'fill 0.2s ease' }} />
            <circle cx={node.x + NODE_W / 2} cy={node.y} r={1.5}
              fill={strokeColor} style={{ transition: 'fill 0.2s ease' }} />
            <text
              x={node.x} y={node.y + 3}
              textAnchor="middle" fontSize="6"
              fill={`hsl(39 100% 94% / ${textAlpha})`}
              fontFamily="monospace" letterSpacing="0.05em"
              style={{ transition: 'fill 0.2s ease' }}>
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Bottom metrics */}
      <text x="330" y="332" textAnchor="middle"
        fill="hsl(39 100% 94% / 0.1)" fontFamily="monospace"
        fontSize="5.5" letterSpacing="0.12em">
        {hasInteracted
          ? `${survivingEdges}/${totalEdges} CONNECTIONS SURVIVING`
          : 'INTERACTIVE STRESS TEST'}
      </text>
    </svg>
  );
};

export default DurabilitySVG;
