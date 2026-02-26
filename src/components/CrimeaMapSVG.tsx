import { useEffect, useRef, useState, useMemo } from 'react';

// Traced from reference silhouette — clockwise from Perekop Isthmus
// Coordinates are [longitude, latitude] in the Crimea bounding box
const COASTLINE: [number, number][] = [
  // === Perekop Isthmus (narrow northern neck) ===
  [33.58, 46.18], [33.62, 46.12], [33.56, 46.06], [33.48, 46.00],
  [33.38, 45.96],

  // === Northwest coast — very jagged with inlets ===
  [33.22, 45.94], [33.10, 45.96], [33.02, 45.92], [32.94, 45.88],
  [32.88, 45.82], [32.92, 45.78], [32.86, 45.74], [32.78, 45.72],
  [32.72, 45.68], [32.76, 45.64], [32.68, 45.60], [32.62, 45.58],
  [32.58, 45.54], [32.54, 45.50],

  // === Cape Tarkhankut (NW tip — jagged) ===
  [32.50, 45.46], [32.48, 45.40], [32.50, 45.36], [32.49, 45.32],
  [32.50, 45.28], [32.55, 45.24], [32.60, 45.22], [32.66, 45.20],

  // === West coast heading south ===
  [32.78, 45.16], [32.88, 45.10], [33.00, 45.06], [33.10, 45.00],
  [33.18, 44.94], [33.24, 44.88], [33.28, 44.82],

  // === Kalamita Bay ===
  [33.32, 44.76], [33.36, 44.72], [33.38, 44.68],

  // === Sevastopol — bottom-left extremity with harbor indentation ===
  [33.40, 44.64], [33.42, 44.60], [33.48, 44.58], [33.52, 44.56],
  [33.50, 44.52], [33.46, 44.50], [33.44, 44.46], [33.48, 44.42],

  // === Cape Fiolent / Cape Sarych (southernmost) ===
  [33.54, 44.40], [33.62, 44.38], [33.72, 44.39], [33.82, 44.38],
  [33.90, 44.39], [33.98, 44.40],

  // === South coast — moderately jagged (mountains) ===
  [34.06, 44.42], [34.12, 44.43], [34.18, 44.42], [34.22, 44.44],
  [34.28, 44.43], [34.34, 44.45], [34.40, 44.44], [34.46, 44.46],
  [34.52, 44.48], [34.58, 44.50], [34.64, 44.52], [34.70, 44.55],
  [34.78, 44.58], [34.86, 44.62], [34.94, 44.66],

  // === Southeast coast toward Feodosia ===
  [35.02, 44.70], [35.08, 44.74], [35.14, 44.78], [35.20, 44.82],
  [35.26, 44.88], [35.32, 44.94], [35.36, 44.98], [35.40, 45.02],

  // === Feodosia Bay ===
  [35.44, 45.04], [35.48, 45.06], [35.50, 45.04],

  // === Narrow connection to Kerch Peninsula ===
  [35.54, 45.06], [35.60, 45.08], [35.66, 45.06], [35.72, 45.04],
  [35.78, 45.06],

  // === Kerch Peninsula — south coast (distinct eastward finger) ===
  [35.84, 45.08], [35.90, 45.06], [35.96, 45.08], [36.02, 45.10],
  [36.08, 45.08], [36.14, 45.10], [36.20, 45.12], [36.26, 45.14],
  [36.32, 45.18], [36.38, 45.20], [36.44, 45.22],

  // === Kerch tip — jagged eastern extremity ===
  [36.50, 45.24], [36.56, 45.26], [36.60, 45.30], [36.64, 45.32],
  [36.66, 45.36], [36.64, 45.38], [36.62, 45.40],
  [36.58, 45.42], [36.54, 45.44], [36.50, 45.42],
  [36.46, 45.44], [36.42, 45.46],

  // === Kerch Peninsula — north coast (return west) ===
  [36.36, 45.48], [36.28, 45.46], [36.20, 45.48], [36.14, 45.46],
  [36.06, 45.48], [35.98, 45.50], [35.90, 45.48], [35.84, 45.50],

  // === Kazantip Bay ===
  [35.78, 45.52], [35.72, 45.54], [35.66, 45.56], [35.60, 45.58],
  [35.54, 45.56],

  // === Arabat Spit connection area ===
  [35.48, 45.58], [35.42, 45.62], [35.38, 45.66], [35.34, 45.72],
  [35.32, 45.78], [35.30, 45.84], [35.32, 45.90],

  // === Sivash coast (north — jagged shallow sea) ===
  [35.28, 45.94], [35.20, 45.96], [35.12, 45.94], [35.04, 45.96],
  [34.94, 45.94], [34.84, 45.96], [34.74, 45.98], [34.64, 46.00],
  [34.52, 45.98], [34.40, 46.00], [34.28, 46.02], [34.16, 46.04],
  [34.04, 46.06], [33.92, 46.08], [33.82, 46.10], [33.72, 46.14],
  [33.64, 46.16], [33.58, 46.18], // close loop
];

// Projection constants
const MIN_LON = 32.3;
const MAX_LON = 36.9;
const MIN_LAT = 44.2;
const MAX_LAT = 46.3;
const SVG_W = 520;
const SVG_H = 340;
const PAD = 20;

function project(lon: number, lat: number): [number, number] {
  const x = PAD + ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * (SVG_W - 2 * PAD);
  const y = PAD + ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * (SVG_H - 2 * PAD);
  return [x, y];
}

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

  const pathD = useMemo(() => {
    return COASTLINE.map((coord, i) => {
      const [x, y] = project(coord[0], coord[1]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ') + ' Z';
  }, []);

  // City positions
  const [sevX, sevY] = project(33.52, 44.58);
  const [yaltaX, yaltaY] = project(34.17, 44.49);
  const [kerchX, kerchY] = project(36.47, 45.36);
  const [simfX, simfY] = project(34.10, 44.95);
  const [yevpX, yevpY] = project(33.37, 45.20);

  // Grid lines
  const gridLons = [33, 34, 35, 36];
  const gridLats = [44.5, 45.0, 45.5, 46.0];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full max-w-lg mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coordinate grid */}
      {gridLons.map(lon => {
        const [x1, y1] = project(lon, MAX_LAT);
        const [x2, y2] = project(lon, MIN_LAT);
        return <line key={`lon-${lon}`} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />;
      })}
      {gridLats.map(lat => {
        const [x1, y1] = project(MIN_LON, lat);
        const [x2, y2] = project(MAX_LON, lat);
        return <line key={`lat-${lat}`} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="hsl(39 100% 94% / 0.04)" strokeWidth={0.5} />;
      })}

      {/* Topographic contours */}
      {(() => {
        const [cx, cy] = project(34.2, 45.1);
        return (
          <>
            <ellipse cx={cx} cy={cy} rx={100} ry={45}
              stroke="hsl(39 100% 94% / 0.03)" strokeWidth={0.5} fill="none" />
            <ellipse cx={cx + 5} cy={cy - 5} rx={60} ry={28}
              stroke="hsl(39 100% 94% / 0.025)" strokeWidth={0.5} fill="none" />
          </>
        );
      })()}

      {/* Main peninsula outline */}
      <path
        d={pathD}
        stroke="hsl(33 67% 67% / 0.5)"
        strokeWidth={1.4}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={5000}
        strokeDashoffset={isVisible ? 0 : 5000}
        style={{ transition: 'stroke-dashoffset 2.5s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Sevastopol marker */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.8s ease 1.5s' }}>
        <circle cx={sevX} cy={sevY} r={10}
          stroke="hsl(33 67% 67% / 0.2)" strokeWidth={0.6} fill="none"
          className="animate-pulse-subtle" />
        <circle cx={sevX} cy={sevY} r={18}
          stroke="hsl(33 67% 67% / 0.08)" strokeWidth={0.4} fill="none"
          className="animate-pulse-subtle" style={{ animationDelay: '0.5s' }} />
        <circle cx={sevX} cy={sevY} r={3}
          fill="hsl(33 67% 67% / 0.8)" className="svg-node-glow" />

        <text x={sevX - 50} y={sevY + 28} fill="hsl(33 67% 67% / 0.7)"
          fontFamily="var(--font-serif)" fontSize={8} fontWeight={400}
          letterSpacing="0.14em" fontStyle="italic">
          SEVASTOPOL
        </text>
        <text x={sevX - 50} y={sevY + 40} fill="hsl(39 100% 94% / 0.2)"
          fontFamily="var(--font-sans)" fontSize={6} letterSpacing="0.06em">
          44.6167°N · 33.5254°E
        </text>
      </g>

      {/* City labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 2s' }}>
        <circle cx={yaltaX} cy={yaltaY} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={yaltaX + 5} y={yaltaY + 3} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">YALTA</text>

        <circle cx={kerchX} cy={kerchY} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={kerchX - 30} y={kerchY - 8} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">KERCH</text>

        <circle cx={simfX} cy={simfY} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={simfX + 5} y={simfY + 3} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">SIMFEROPOL</text>

        <circle cx={yevpX} cy={yevpY} r={1.5} fill="hsl(39 100% 94% / 0.15)" />
        <text x={yevpX + 5} y={yevpY + 3} fill="hsl(39 100% 94% / 0.12)"
          fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.08em">YEVPATORIYA</text>
      </g>

      {/* Coordinate labels */}
      <g className={isVisible ? 'opacity-100' : 'opacity-0'}
        style={{ transition: 'opacity 0.6s ease 2.2s' }}>
        {gridLons.map(lon => {
          const [x] = project(lon, MIN_LAT);
          return <text key={`lbl-lon-${lon}`} x={x - 8} y={SVG_H - 5} fill="hsl(39 100% 94% / 0.1)"
            fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">{lon}°E</text>;
        })}
        {gridLats.map(lat => {
          const [, y] = project(MIN_LON, lat);
          return <text key={`lbl-lat-${lat}`} x={5} y={y + 2} fill="hsl(39 100% 94% / 0.1)"
            fontFamily="var(--font-sans)" fontSize={5.5} letterSpacing="0.06em">{lat}°N</text>;
        })}
      </g>
    </svg>
  );
};

export default CrimeaMapSVG;
