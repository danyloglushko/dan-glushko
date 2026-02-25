const SystemsUnderPressureSVG = () => {
  // Abstract node network with flowing connections
  const nodes = [
    { cx: 120, cy: 80, r: 4, delay: 0 },
    { cx: 280, cy: 60, r: 3, delay: 0.2 },
    { cx: 400, cy: 120, r: 5, delay: 0.4 },
    { cx: 200, cy: 200, r: 4, delay: 0.6 },
    { cx: 350, cy: 220, r: 3, delay: 0.3 },
    { cx: 500, cy: 160, r: 4, delay: 0.5 },
    { cx: 150, cy: 320, r: 3, delay: 0.7 },
    { cx: 320, cy: 340, r: 5, delay: 0.1 },
    { cx: 480, cy: 300, r: 4, delay: 0.8 },
    { cx: 600, cy: 100, r: 3, delay: 0.9 },
    { cx: 550, cy: 260, r: 4, delay: 0.4 },
    { cx: 80, cy: 180, r: 3, delay: 0.6 },
    { cx: 650, cy: 200, r: 3, delay: 0.2 },
    { cx: 250, cy: 140, r: 4, delay: 0.5 },
    { cx: 450, cy: 50, r: 3, delay: 0.3 },
  ];

  const edges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 2],
    [2, 5], [3, 6], [6, 7], [7, 8], [5, 8],
    [5, 10], [2, 9], [9, 12], [10, 12],
    [1, 13], [13, 4], [0, 11], [11, 3], [14, 2], [14, 9],
    [7, 4], [8, 10],
  ];

  return (
    <svg
      viewBox="0 0 720 400"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Faint grid */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`vg-${i}`}
          x1={i * 100}
          y1={0}
          x2={i * 100}
          y2={400}
          stroke="hsl(39 100% 94% / 0.03)"
          strokeWidth={0.5}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`hg-${i}`}
          x1={0}
          y1={i * 100}
          x2={720}
          y2={i * 100}
          stroke="hsl(39 100% 94% / 0.03)"
          strokeWidth={0.5}
        />
      ))}

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="hsl(39 100% 94% / 0.08)"
          strokeWidth={1}
        />
      ))}

      {/* Flow lines - animated */}
      {edges.slice(0, 8).map(([a, b], i) => (
        <line
          key={`f-${i}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="hsl(33 67% 67% / 0.15)"
          strokeWidth={1.2}
          strokeDasharray="4 8"
          className="animate-pulse-subtle"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={`n-${i}`}>
          {/* Glow */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r * 3}
            fill="hsl(33 67% 67% / 0.05)"
            className="animate-pulse-subtle"
            style={{ animationDelay: `${node.delay}s` }}
          />
          {/* Core */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="hsl(33 67% 67% / 0.6)"
            stroke="hsl(33 67% 67% / 0.3)"
            strokeWidth={1}
          />
        </g>
      ))}
    </svg>
  );
};

export default SystemsUnderPressureSVG;
