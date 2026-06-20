import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Points, PointMaterial, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader for glowing points
const GlowingPointMaterial = () => {
  return (
    <PointMaterial
      transparent
      vertexColors={false}
      color="#06b6d4"
      size={0.8}
      blending={THREE.AdditiveBlending}
      opacity={0.8}
    />
  );
};

const NeuralParticles = () => {
  const ref = useRef();
  const count = 4000;
  
  // Generate positions in a sphere/cube
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a spherical shape
      const radius = 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i*3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // Flatten vertically
      pos[i*3+2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  // Colors for each particle (cyan to purple gradient)
  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const mix = Math.random();
      cols[i*3] = 0.2 + mix * 0.6;     // R
      cols[i*3+1] = 0.4 + mix * 0.5;   // G
      cols[i*3+2] = 0.8 + mix * 0.2;   // B
    }
    return cols;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0008;
      ref.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.35}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Neural connections between nearby particles
const NeuralConnections = () => {
  const [lines, setLines] = useState([]);
  
  // Generate random points for connections
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 200; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 50 - 20
      ));
    }
    return pts;
  }, []);

  // Create lines between nearby points
  const connectionLines = useMemo(() => {
    const linesArray = [];
    const maxDist = 18;
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < maxDist) {
          const opacity = 1 - (dist / maxDist);
          if (opacity > 0.3) {
            linesArray.push({
              points: [points[i], points[j]],
              opacity
            });
          }
        }
      }
    }
    return linesArray;
  }, [points]);

  return (
    <group>
      {connectionLines.map((line, idx) => (
        <Line
          key={idx}
          points={line.points}
          color="#06b6d4"
          opacity={line.opacity * 0.4}
          transparent
          lineWidth={0.8}
        />
      ))}
    </group>
  );
};

// Floating orbs / glow balls
const GlowingOrbs = () => {
  const orbCount = 6;
  const orbs = useMemo(() => {
    return Array.from({ length: orbCount }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 40 - 20
      ),
      color: Math.random() > 0.5 ? '#06b6d4' : '#6366f1',
      radius: 1.5 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.3
    }));
  }, []);

  useFrame((state, delta) => {
    // Animate orbs' scale and position slightly
    orbs.forEach((orb, i) => {
      const mesh = document.getElementById(`orb-${i}`);
      if (mesh) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * orb.speed) * 0.15;
        mesh.scale.set(scale, scale, scale);
      }
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} id={`orb-${i}`}>
          <sphereGeometry args={[orb.radius, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      ))}
    </>
  );
};

const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -10 }}>
      <Canvas
        camera={{ position: [0, 0, 45], fov: 60 }}
        style={{ background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)' }}
        gl={{ alpha: false, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
        
        <NeuralParticles />
        <NeuralConnections />
        <GlowingOrbs />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping={false}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;