import { useEffect, useRef, useState, useMemo } from 'react';

// Real geographic coordinates [longitude, latitude] tracing Crimea's coastline clockwise
// from the Perekop Isthmus. Sources: OSM/Wikimedia bounding box 32.4-36.8°E, 44.2-46.3°N
const COASTLINE: [number, number][] = [
  // === Perekop Isthmus (narrow northern neck) ===
  [33.52, 46.16], [33.55, 46.10], [33.49, 46.04], [33.42, 45.97],
  // === Karkinit Bay (large NW indentation) ===
  [33.35, 45.92], [33.20, 45.88], [33.05, 45.85], [32.90, 45.78],
  [32.78, 45.70], [32.70, 45.60],
  // === Cape Tarkhankut (NW peninsula) ===
  [32.58, 45.52], [32.49, 45.42], [32.48, 45.35], [32.50, 45.28],
  [32.58, 45.22], [32.68, 45.18],
  // === West coast south ===
  [32.82, 45.12], [32.95, 45.08], [33.10, 45.02], [33.22, 44.98],
  [33.30, 44.92], [33.36, 44.85],
  // === Kalamita Bay / approaching Sevastopol ===
  [33.38, 44.78], [33.42, 44.72], [33.46, 44.68],
  // === Sevastopol harbor indentation ===
  [33.48, 44.63], [33.52, 44.60], [33.58, 44.58], [33.55, 44.55],
  [33.50, 44.52], [33.48, 44.48],
  // === Cape Fiolent / Cape Sarych (southernmost) ===
  [33.52, 44.44], [33.58, 44.41], [33.65, 44.39], [33.74, 44.38],
  [33.85, 44.39], [33.95, 44.40],
  // === Southern mountain coast (jagged) ===
  [34.05, 44.42], [34.12, 44.43], [34.18, 44.44], // near Yalta
  [34.28, 44.46], [34.35, 44.48], [34.42, 44.50], // near Alushta
  [34.52, 44.54], [34.62, 44.58], [34.72, 44.62],
  [34.82, 44.68], [34.92, 44.73],
  // === Sudak / Feodosia Bay ===
  [35.02, 44.78], [35.12, 44.83], [35.22, 44.88],
  [35.30, 44.94], [35.38, 45.00], // Feodosia
  [35.42, 45.04], [35.48, 45.06],
  // === Transition to Kerch Peninsula ===
  [35.55, 45.08], [35.62, 45.10], [35.70, 45.12],
  [35.80, 45.14], [35.90, 45.18], [36.00, 45.22],
  // === Kerch Peninsula (narrow eastern finger) ===
  [36.10, 45.26], [36.20, 45.30], [36.30, 45.33],
  [36.40, 45.35], [36.50, 45.36], [36.60, 45.38], // Cape Fonar (E tip)
  // === North side of Kerch Peninsula ===
  [36.58, 45.42], [36.50, 45.44], [36.40, 45.46],
  [36.30, 45.48], [36.20, 45.50], [36.10, 45.50],
  [36.00, 45.48],
  // === Kazantip Bay ===
  [35.88, 45.50], [35.78, 45.52], [35.68, 45.56],
  [35.58, 45.60], [35.50, 45.64],
  // === Arabat Spit area (NE coast) ===
  [35.42, 45.68], [35.35, 45.74], [35.30, 45.80],
  [35.28, 45.86], [35.30, 45.92],
  // === Sivash (northern shallow sea coast) ===
  [35.25, 45.96], [35.18, 45.98], [35.10, 45.96],
  [35.00, 45.94], [34.88, 45.95], [34.75, 45.98],
  [34.60, 46.00], [34.45, 46.02], [34.30, 46.04],
  [34.15, 46.06], [34.00, 46.08],
  // === Back toward Perekop ===
  [33.85, 46.10], [33.72, 46.14], [33.65, 46.17],
  [33.58, 46.18], [33.52, 46.16], // close the loop
];

// Projection constants
const MIN_LON = 32.3;
const MAX_LON = 36.8;
const MIN_LAT = 44.2;
const MAX_LAT = 46.3;
const SVG_W = 500;
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

  // Project city positions
  const [sevX, sevY] = project(33.52, 44.62);
  const [yaltaX, yaltaY] = project(34.17, 44.49);
  const [kerchX, kerchY] = project(36.47, 45.36);
  const [simfX, simfY] = project(34.10, 44.95);
  const [yevpX, yevpY] = project(33.37, 45.20);

  // Coordinate grid lines
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
        strokeDasharray={4000}
        strokeDashoffset={isVisible ? 0 : 4000}
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
