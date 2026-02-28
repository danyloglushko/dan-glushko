import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Reservoir layers ── */
const ReservoirLayer = ({
  y,
  height,
  color,
  opacity,
  wiggle = 0,
}: {
  y: number;
  height: number;
  color: string;
  opacity: number;
  wiggle?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a wavy top surface via a custom geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(4, height, 3, 32, 1, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const pz = pos.getZ(i);
      const py = pos.getY(i);
      // Only deform the top face
      if (py > 0) {
        pos.setY(
          i,
          py +
            Math.sin(px * 1.2 + wiggle) * 0.08 +
            Math.cos(pz * 1.5 + wiggle * 0.7) * 0.06
        );
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, [height, wiggle]);

  return (
    <mesh ref={meshRef} position={[0, y, 0]} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.7}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ── Well bore (vertical pipe) ── */
const WellBore = ({ x, z, label }: { x: number; z: number; label: string }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Subtle pulsing glow
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.02;
      ref.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group ref={ref} position={[x, 0.2, z]}>
      {/* Main well casing */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 12]} />
        <meshStandardMaterial color="#c8a960" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Well head cap */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.1, 8]} />
        <meshStandardMaterial color="#c8a960" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Perforation zone indicator */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
        <meshStandardMaterial
          color="#c8a960"
          transparent
          opacity={0.4}
          emissive="#c8a960"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

/* ── Fluid particles (oil droplets in reservoir) ── */
const FluidParticles = () => {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const oilColor = new THREE.Color('#8B6914');
    const waterColor = new THREE.Color('#2a4a6b');
    const gasColor = new THREE.Color('#c8a960');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 3.5;
      pos[i3 + 2] = (Math.random() - 0.5) * 2.5;

      // Distribute by layer: gas on top, oil middle, water bottom
      const layer = Math.random();
      if (layer < 0.25) {
        // Gas cap
        pos[i3 + 1] = 0.2 + Math.random() * 0.3;
        col[i3] = gasColor.r;
        col[i3 + 1] = gasColor.g;
        col[i3 + 2] = gasColor.b;
      } else if (layer < 0.65) {
        // Oil zone
        pos[i3 + 1] = -0.2 + Math.random() * 0.4;
        col[i3] = oilColor.r;
        col[i3 + 1] = oilColor.g;
        col[i3 + 2] = oilColor.b;
      } else {
        // Water zone
        pos[i3 + 1] = -0.7 + Math.random() * 0.3;
        col[i3] = waterColor.r;
        col[i3 + 1] = waterColor.g;
        col[i3 + 2] = waterColor.b;
      }
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const pos = ref.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i] += Math.sin(clock.elapsedTime + i) * 0.0005;
        arr[i + 2] += Math.cos(clock.elapsedTime * 0.7 + i) * 0.0003;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Grid wireframe overlay ── */
const GridOverlay = () => (
  <group position={[0, 0.55, 0]}>
    <gridHelper
      args={[4, 16, '#c8a96030', '#c8a96015']}
      rotation={[0, 0, 0]}
    />
  </group>
);

/* ── Fault line ── */
const FaultLine = () => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 20; i++) {
      const t = i / 19;
      pts.push(
        new THREE.Vector3(
          -1.5 + t * 3,
          0.5 - t * 0.8 + Math.sin(t * 4) * 0.1,
          -0.3 + Math.sin(t * 3) * 0.3
        )
      );
    }
    return pts;
  }, []);

  const lineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: '#c8a960', transparent: true, opacity: 0.3 }), []);
  const lineObj = useMemo(() => new THREE.Line(lineGeo, mat), [lineGeo, mat]);

  return <primitive object={lineObj} />;
};

/* ── Scene ── */
const ReservoirScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.05 - 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#f5e6c8" />
      <directionalLight position={[-3, 4, -3]} intensity={0.3} color="#4a6fa5" />
      <pointLight position={[0, 2, 0]} intensity={0.2} color="#c8a960" />

      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.05}>
        <group ref={groupRef} rotation={[0.35, -0.3, 0]}>
          {/* Overburden / cap rock */}
          <ReservoirLayer y={0.65} height={0.25} color="#2a2a28" opacity={0.5} wiggle={0} />

          {/* Gas cap */}
          <ReservoirLayer y={0.35} height={0.2} color="#3d3520" opacity={0.45} wiggle={1.2} />

          {/* Oil-bearing reservoir (main pay zone) */}
          <ReservoirLayer y={0.05} height={0.35} color="#4a3518" opacity={0.55} wiggle={2.1} />

          {/* Water zone (aquifer) */}
          <ReservoirLayer y={-0.4} height={0.3} color="#1a2a3d" opacity={0.5} wiggle={3} />

          {/* Basement rock */}
          <ReservoirLayer y={-0.8} height={0.3} color="#1a1a18" opacity={0.6} wiggle={0.5} />

          {/* Fluid particles */}
          <FluidParticles />

          {/* Well bores */}
          <WellBore x={-0.8} z={0} label="INJ-1" />
          <WellBore x={0.5} z={0.3} label="PROD-1" />
          <WellBore x={1.3} z={-0.4} label="PROD-2" />

          {/* Fault line */}
          <FaultLine />

          {/* Grid overlay */}
          <GridOverlay />
        </group>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};

/* ── Main component ── */
const ReservoirModel3D = () => {
  return (
    <div className="w-full aspect-[4/3] max-w-2xl mx-auto relative">
      <Canvas
        camera={{ position: [3, 2.5, 3], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ReservoirScene />
      </Canvas>

      {/* Layer legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
        {[
          { color: '#2a2a28', label: 'Cap Rock' },
          { color: '#3d3520', label: 'Gas Cap' },
          { color: '#4a3518', label: 'Oil Zone' },
          { color: '#1a2a3d', label: 'Aquifer' },
          { color: '#1a1a18', label: 'Basement' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-sm border border-gold/20"
              style={{ backgroundColor: color }}
            />
            <span className="font-sans text-[8px] tracking-[0.12em] uppercase text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservoirModel3D;
