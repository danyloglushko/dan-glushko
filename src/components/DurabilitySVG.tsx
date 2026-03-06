import { useEffect, useRef, useState } from 'react';

interface WorkflowNode {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  type?: 'trigger' | 'action' | 'condition' | 'output';
}

const DurabilitySVG = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<'complex' | 'reducing' | 'simple'>('complex');
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

  // Complex n8n-style workflow nodes
  const complexNodes: WorkflowNode[] = [
    // Row 1 - triggers
    { x: 30, y: 30, w: 70, h: 28, label: 'Webhook', type: 'trigger' },
    { x: 30, y: 72, w: 70, h: 28, label: 'Schedule', type: 'trigger' },
    { x: 30, y: 114, w: 70, h: 28, label: 'Event', type: 'trigger' },
    // Row 2 - processing
    { x: 150, y: 20, w: 65, h: 28, label: 'Validate', type: 'action' },
    { x: 150, y: 58, w: 65, h: 28, label: 'Parse', type: 'action' },
    { x: 150, y: 96, w: 65, h: 28, label: 'Transform', type: 'action' },
    { x: 150, y: 134, w: 65, h: 28, label: 'Enrich', type: 'action' },
    // Row 3 - conditions
    { x: 265, y: 30, w: 60, h: 28, label: 'If/Else', type: 'condition' },
    { x: 265, y: 72, w: 60, h: 28, label: 'Switch', type: 'condition' },
    { x: 265, y: 114, w: 60, h: 28, label: 'Filter', type: 'condition' },
    // Row 4 - actions
    { x: 375, y: 15, w: 65, h: 28, label: 'API Call', type: 'action' },
    { x: 375, y: 50, w: 65, h: 28, label: 'DB Write', type: 'action' },
    { x: 375, y: 85, w: 65, h: 28, label: 'Email', type: 'action' },
    { x: 375, y: 120, w: 65, h: 28, label: 'Slack', type: 'action' },
    { x: 375, y: 155, w: 65, h: 28, label: 'Log', type: 'action' },
    // Row 5 - more actions
    { x: 490, y: 25, w: 65, h: 28, label: 'Retry', type: 'action' },
    { x: 490, y: 63, w: 65, h: 28, label: 'Merge', type: 'action' },
    { x: 490, y: 101, w: 65, h: 28, label: 'Cache', type: 'action' },
    { x: 490, y: 139, w: 65, h: 28, label: 'Queue', type: 'action' },
    // Row 6 - outputs
    { x: 605, y: 40, w: 65, h: 28, label: 'Response', type: 'output' },
    { x: 605, y: 85, w: 65, h: 28, label: 'Store', type: 'output' },
    { x: 605, y: 130, w: 65, h: 28, label: 'Notify', type: 'output' },
  ];

  // Complex edges (index pairs)
  const complexEdges: [number, number][] = [
    [0,3],[0,4],[1,4],[1,5],[2,5],[2,6],
    [3,7],[3,8],[4,7],[4,8],[5,8],[5,9],[6,9],
    [7,10],[7,11],[8,11],[8,12],[8,13],[9,13],[9,14],
    [10,15],[10,16],[11,16],[12,16],[12,17],[13,17],[13,18],[14,18],
    [15,19],[16,19],[16,20],[17,20],[17,21],[18,21],
  ];

  // Simple workflow - 4 clean nodes
  const simpleNodes: WorkflowNode[] = [
    { x: 155, y: 65, w: 90, h: 34, label: 'Input', type: 'trigger' },
    { x: 305, y: 65, w: 90, h: 34, label: 'Process', type: 'action' },
    { x: 455, y: 65, w: 90, h: 34, label: 'Output', type: 'output' },
  ];

  const simpleEdges: [number, number][] = [[0,1],[1,2]];

  const isReducingOrSimple = phase === 'reducing' || phase === 'simple';
  const isSimple = phase === 'simple';

  // Color by type
  const getNodeStroke = (type?: string, simple?: boolean) => {
    const alpha = simple ? 0.6 : 0.25;
    switch (type) {
      case 'trigger': return `hsl(150 40% 55% / ${alpha})`;
      case 'condition': return `hsl(45 80% 60% / ${alpha})`;
      case 'output': return `hsl(200 50% 60% / ${alpha})`;
      default: return `hsl(33 67% 67% / ${alpha})`;
    }
  };

  const getNodeFill = (type?: string, simple?: boolean) => {
    const alpha = simple ? 0.08 : 0.03;
    switch (type) {
      case 'trigger': return `hsl(150 40% 55% / ${alpha})`;
      case 'condition': return `hsl(45 80% 60% / ${alpha})`;
      case 'output': return `hsl(200 50% 60% / ${alpha})`;
      default: return `hsl(33 67% 67% / ${alpha})`;
    }
  };

  // Map complex nodes to simple node targets for reducing phase
  const getReducedPos = (idx: number) => {
    // Map to 3 groups: triggers→Input, middle→Process, outputs→Output
    if (idx <= 2) return simpleNodes[0]; // triggers
    if (idx >= 19) return simpleNodes[2]; // outputs
    if (idx >= 10) return simpleNodes[1]; // mid-right actions → Process
    if (idx >= 7) return simpleNodes[1]; // conditions → Process
    return simpleNodes[0]; // early processing → Input
  };

  const phaseLabel = phase === 'complex' ? 'ENTROPY' : phase === 'reducing' ? 'REDUCING' : 'DURABILITY';
  const phaseLabelColor = phase === 'simple'
    ? 'hsl(33 67% 67% / 0.5)'
    : 'hsl(39 100% 94% / 0.2)';

  // Connector dot radius
  const dotR = 2.5;

  return (
    <svg
      ref={ref}
      viewBox="0 0 700 200"
      className="w-full max-w-4xl mx-auto cursor-default"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Phase label */}
      <text x="350" y="14" textAnchor="middle"
        fill={phaseLabelColor} fontFamily="var(--font-sans)"
        fontSize="7" letterSpacing="0.25em"
        style={{ transition: 'fill 0.8s ease' }}>
        {phaseLabel}
      </text>

      {isSimple ? (
        <>
          {/* Simple edges */}
          {simpleEdges.map(([a, b], i) => {
            const fromNode = simpleNodes[a];
            const toNode = simpleNodes[b];
            const x1 = fromNode.x + fromNode.w;
            const y1 = fromNode.y + fromNode.h / 2;
            const x2 = toNode.x;
            const y2 = toNode.y + toNode.h / 2;
            return (
              <g key={`se-${i}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(33 67% 67% / 0.3)" strokeWidth={1.2}
                  style={{ transition: 'all 0.8s ease' }} />
                {/* Output connector dot */}
                <circle cx={x1} cy={y1} r={dotR}
                  fill="hsl(33 67% 67% / 0.5)" />
                {/* Input connector dot */}
                <circle cx={x2} cy={y2} r={dotR}
                  fill="hsl(33 67% 67% / 0.5)" />
              </g>
            );
          })}

          {/* Simple nodes */}
          {simpleNodes.map((node, i) => (
            <g key={`sn-${i}`} style={{ transition: 'all 0.8s ease' }}>
              <rect x={node.x} y={node.y} width={node.w} height={node.h}
                rx={4}
                fill={getNodeFill(node.type, true)}
                stroke={getNodeStroke(node.type, true)}
                strokeWidth={1.4} />
              <text x={node.x + node.w / 2} y={node.y + node.h / 2 + 3.5}
                textAnchor="middle" fontSize="8.5"
                fill="hsl(39 100% 94% / 0.7)"
                fontFamily="monospace" letterSpacing="0.06em">
                {node.label}
              </text>
            </g>
          ))}

          {/* Subtle enclosure */}
          <rect x="135" y="45" width="430" height="74" rx={8}
            fill="none" stroke="hsl(33 67% 67% / 0.06)" strokeWidth={0.8}
            className="animate-pulse-subtle" />
        </>
      ) : (
        <>
          {/* Complex edges */}
          {complexEdges.map(([a, b], i) => {
            const nodeA = isReducingOrSimple ? getReducedPos(a) : complexNodes[a];
            const nodeB = isReducingOrSimple ? getReducedPos(b) : complexNodes[b];
            const x1 = nodeA.x + nodeA.w;
            const y1 = nodeA.y + nodeA.h / 2;
            const x2 = nodeB.x;
            const y2 = nodeB.y + nodeB.h / 2;
            return (
              <line key={`ce-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isReducingOrSimple ? 'hsl(33 67% 67% / 0.04)' : 'hsl(39 100% 94% / 0.08)'}
                strokeWidth={0.6}
                className={isVisible ? 'opacity-100' : 'opacity-0'}
                style={{ transition: 'all 1.2s cubic-bezier(.22,.61,.36,1)' }}
              />
            );
          })}

          {/* Complex nodes */}
          {complexNodes.map((node, i) => {
            const pos = isReducingOrSimple ? getReducedPos(i) : node;
            const isCondition = node.type === 'condition';
            return (
              <g key={`cn-${i}`}
                className={isVisible ? 'opacity-100' : 'opacity-0'}
                style={{ transition: 'all 1.2s cubic-bezier(.22,.61,.36,1)' }}>
                {isCondition ? (
                  // Diamond shape for conditions
                  <g transform={`translate(${pos.x + pos.w / 2}, ${pos.y + pos.h / 2})`}>
                    <polygon
                      points={`0,${-pos.h / 2} ${pos.w / 2},0 0,${pos.h / 2} ${-pos.w / 2},0`}
                      fill={getNodeFill(node.type)}
                      stroke={getNodeStroke(node.type)}
                      strokeWidth={0.8}
                    />
                    <text x={0} y={3} textAnchor="middle" fontSize="5"
                      fill={`hsl(39 100% 94% / ${isReducingOrSimple ? 0.05 : 0.3})`}
                      fontFamily="monospace" letterSpacing="0.04em"
                      style={{ transition: 'fill 1s ease' }}>
                      {node.label}
                    </text>
                  </g>
                ) : (
                  <>
                    <rect x={pos.x} y={pos.y} width={pos.w} height={pos.h}
                      rx={3}
                      fill={getNodeFill(node.type)}
                      stroke={getNodeStroke(node.type)}
                      strokeWidth={0.8} />
                    {/* Left connector dot */}
                    <circle cx={pos.x} cy={pos.y + pos.h / 2} r={1.5}
                      fill={getNodeStroke(node.type)} />
                    {/* Right connector dot */}
                    <circle cx={pos.x + pos.w} cy={pos.y + pos.h / 2} r={1.5}
                      fill={getNodeStroke(node.type)} />
                    <text x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 3}
                      textAnchor="middle" fontSize="5.5"
                      fill={`hsl(39 100% 94% / ${isReducingOrSimple ? 0.05 : 0.35})`}
                      fontFamily="monospace" letterSpacing="0.04em"
                      style={{ transition: 'fill 1s ease' }}>
                      {node.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </>
      )}

      {/* Bottom caption */}
      <text x="350" y="192" textAnchor="middle"
        fill="hsl(39 100% 94% / 0.12)" fontFamily="var(--font-sans)"
        fontSize="5.5" letterSpacing="0.15em">
        {isSimple ? 'THREE NODES. ZERO FRAGILITY.' : 'OBSERVE THE REDUCTION'}
      </text>
    </svg>
  );
};

export default DurabilitySVG;
