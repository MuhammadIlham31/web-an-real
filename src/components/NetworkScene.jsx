"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";

function Nodes() {
  const group = useRef(null);
  const points = useMemo(() => [
    [-2.6, 1.1, 0], [-0.6, 1.8, 0], [1.4, 1, 0], [2.5, -0.4, 0], [0.4, -1.5, 0], [-1.8, -1, 0],
  ], []);
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4], [0, 5]];

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.04;
    group.current.rotation.x = mouse.y * 0.03;
    group.current.rotation.y = mouse.x * 0.04;
  });

  return (
    <group ref={group}>
      {links.map(([from, to]) => <Line key={`${from}-${to}`} points={[points[from], points[to]]} color="#2196F3" transparent opacity={0.38} lineWidth={0.7} />)}
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[index === 1 ? 0.12 : 0.075, 16, 16]} />
          <meshBasicMaterial color={index === 1 ? "#90CAF9" : "#2196F3"} />
        </mesh>
      ))}
    </group>
  );
}

export default function NetworkScene() {
  return (
    <div className="network-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]}>
        <Nodes />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} enableRotate={false} />
      </Canvas>
    </div>
  );
}
