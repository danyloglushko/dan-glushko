import { useEffect, useRef, useState } from 'react';

const DurabilitySVG = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Left side: complex tangled system. Right side: refined simple system.
  // An arrow in between representing the reduction process.

  const complexNodes = [
    { x: 70, y: 60 }, { x: 120, y: 40 }, { x: 160, y: 75 },
    { x: 45, y: 110 }, { x: 100, y: 100 }, { x: 150, y: 120 },
    { x: 80, y: 150 }, { x: 130, y: 160 }, { x: 55, y: 170 },
    { x: 170, y: 155 }, { x: 110, y: 55 }, { x: 40, y: 65 },
  ];

  // Many tangled connections
  const complexEdges = [
    [0,1],[0,4],[0,3],[1,2],[1,4],[1,10],[2,5],[2,10],[3,4],[3,6],[3,8],
    [4,5],[4,6],[4,7],[5,7],[5,9],[6,7],[6,8],[7,9],[8,6],[10,4],[10,0],
    [11,0],[11,3],[11,8],[9,2],[1,5],[3,7],
  ];

  const simpleNodes = [
    { x: 400, y: 70 },
    { x: 360, y: 130 },
    { x: 440, y: 130 },
    { x: 400, y: 180 },
  ];

  const simpleEdges = [
    [0,1],[0,2],[1,3],[2,3],
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 240"
      className="w-full max-w-xl mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left label */}
      <text x="100" y="220" textAnchor="middle"
        fill="hsl(39 100% 94% / 0.15)" fontFamily="var(--font-sans)"
        fontSize="6" letterSpacing="0.18em">
        COMPLEXITY
      </text>

      {/* Right label */}
      <text x="400" y="220" textAnchor="middle"
        fill="hsl(33 67% 67% / 0.4)" fontFamily="var(--font-sans)"
        fontSize="6" letterSpacing="0.18em">
        DURABILITY
      </text>

      {/* Complex edges (tangled) */}
      {complexEdges.map(([a, b], i) => (
        <line
          key={`ce-${i}`}
          x1={complexNodes[a].x} y1={complexNodes[a].y}
          x2={complexNodes[b].x} y2={complexNodes[b].y}
          stroke="hsl(39 100% 94% / 0.06)"
          strokeWidth={0.8}
          className={isVisible ? 'opacity-100' : 'opacity-0'}
          style={{ transition: `opacity 0.4s ease ${0.1 + i * 0.03}s` }}
        />
      ))}

      {/* Complex nodes */}
      {complexNodes.map((node, i) => (
        <circle
          key={`cn-${i}`}
          cx={node.x} cy={node.y} r={2.5}
          fill="hsl(39 100% 94% / 0.12)"
          stroke="hsl(39 100% 94% / 0.2)"
          strokeWidth={0.6}
          className={isVisible ? 'opacity-100' : 'opacity-0'}
          style={{ transition: `opacity 0.5s ease ${0.3 + i * 0.05}s` }}
        />
      ))}

      {/* Center arrow: reduction process */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.8s ease 1.2s' }}>
        {/* Arrow line */}
        <line x1="220" y1="115" x2="310" y2="115"
          stroke="hsl(33 67% 67% / 0.25)" strokeWidth={1}
          strokeDasharray="4 3" />
        {/* Arrowhead */}
        <polygon points="310,110 320,115 310,120"
          fill="hsl(33 67% 67% / 0.25)" />
        {/* Label */}
        <text x="270" y="105" textAnchor="middle"
          fill="hsl(33 67% 67% / 0.3)" fontFamily="var(--font-sans)"
          fontSize="5.5" letterSpacing="0.12em">
          REDUCE
        </text>
      </g>

      {/* Simple edges */}
      {simpleEdges.map(([a, b], i) => (
        <line
          key={`se-${i}`}
          x1={simpleNodes[a].x} y1={simpleNodes[a].y}
          x2={simpleNodes[b].x} y2={simpleNodes[b].y}
          stroke="hsl(33 67% 67% / 0.25)"
          strokeWidth={1.2}
          className={isVisible ? 'opacity-100' : 'opacity-0'}
          style={{ transition: `opacity 0.5s ease ${1.5 + i * 0.15}s` }}
        />
      ))}

      {/* Simple nodes */}
      {simpleNodes.map((node, i) => (
        <g key={`sn-${i}`}
          className={isVisible ? 'opacity-100' : 'opacity-0'}
          style={{ transition: `opacity 0.5s ease ${1.6 + i * 0.15}s` }}>
          <circle cx={node.x} cy={node.y} r={4}
            fill="hsl(33 67% 67% / 0.15)"
            stroke="hsl(33 67% 67% / 0.5)"
            strokeWidth={1.2} />
          <circle cx={node.x} cy={node.y} r={1.5}
            fill="hsl(33 67% 67% / 0.7)" />
        </g>
      ))}

      {/* Subtle glow on simple structure */}
      <circle cx="400" cy="125" r="55"
        fill="none" stroke="hsl(33 67% 67% / 0.04)" strokeWidth={0.8}
        className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 1s ease 2s' }} />
    </svg>
  );
};

export default DurabilitySVG;
