import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { scrollState } from '../lib/smoothScroll';
import { STAGES } from './stages';
import EagleParticles from './EagleParticles';

const SPACING = 15; // world units between stages
const FOCUS_Z = -3; // where a stage sits when "in focus" (in front of camera)
const CAM_Z = 6;

/** One stage placed at a fixed depth inside the dolly world group. */
function StageSlot({ index, Comp, mobile }) {
  const ref = useRef();
  const localZ = -index * SPACING;

  useFrame(() => {
    if (!ref.current) return;
    // world group is translated by Scene; compute this slot's distance to cam
    const worldZ = localZ + worldZRef.value;
    const dist = Math.abs(CAM_Z - worldZ);
    // Cull far stages for performance; fog hides the seam
    ref.current.visible = dist < SPACING * 1.6;
    // subtle scale-in as it approaches focus
    const f = THREE.MathUtils.clamp(1 - dist / (SPACING * 1.4), 0, 1);
    const s = 0.82 + f * 0.18;
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref} position={[0, 0, localZ]}>
      <Comp mobile={mobile} />
    </group>
  );
}

// shared mutable ref for current world Z so StageSlots can read it
const worldZRef = { value: FOCUS_Z };

function DollyWorld({ mobile }) {
  const world = useRef();
  const n = STAGES.length;

  useFrame(() => {
    // Map global scroll progress to a dolly along Z through all stages.
    const p = scrollState.progress;
    const targetZ = FOCUS_Z + p * (n - 1) * SPACING;
    // smooth toward target
    worldZRef.value += (targetZ - worldZRef.value) * 0.12;
    if (world.current) world.current.position.z = worldZRef.value;
  });

  return (
    <group ref={world}>
      {STAGES.map((Comp, i) => (
        <StageSlot key={i} index={i} Comp={Comp} mobile={mobile} />
      ))}
    </group>
  );
}

/** Eagle that periodically streaks across the view — the recurring transition. */
function FlyingEagle({ mobile }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    // a slow diagonal loop far in the background
    const loop = (t * 0.08) % 1;
    ref.current.position.x = -9 + loop * 18;
    ref.current.position.y = 3 - Math.sin(loop * Math.PI) * 2.2;
    ref.current.position.z = -6 - Math.cos(loop * Math.PI) * 3;
    ref.current.rotation.z = -0.2 + Math.sin(loop * Math.PI) * 0.4;
    const s = (0.5 + Math.sin(loop * Math.PI) * 0.5) * (mobile ? 0.8 : 1);
    ref.current.scale.setScalar(0.6 + s * 0.6);
  });
  return (
    <group ref={ref}>
      <EagleParticles count={mobile ? 900 : 1500} assemble={1} scale={0.7} size={0.018} color="#7fb2ff" flap={0.16} />
    </group>
  );
}

/**
 * CameraController — scroll-driven cinematic camera. On top of the world dolly
 * (stages travel past), the camera orbits and zooms as it passes through each
 * scene, adds mouse parallax and a subtle velocity roll. Never teleports:
 * everything is smoothed.
 */
const FOCUS = new THREE.Vector3(0, 0, FOCUS_Z);
const _pos = new THREE.Vector3();

function CameraController({ mobile }) {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0, roll: 0, orbit: 0, zoom: 0 });
  const n = STAGES.length;

  useMemo(() => {
    camera.position.set(0, 0, CAM_Z);
    camera.lookAt(FOCUS);
  }, [camera]);

  useFrame(({ pointer }, delta) => {
    const p = scrollState.progress;
    const sp = p * (n - 1);
    const f = sp - Math.floor(sp); // 0..1 within the current scene
    const bell = Math.sin(f * Math.PI); // peaks mid-scene

    const orbitAmt = mobile ? 0.25 : 0.6; // radians swept per scene
    const orbitTarget = (f - 0.5) * orbitAmt;
    const zoomTarget = bell * (mobile ? 0.8 : 1.6); // pull in mid-scene

    const s = smooth.current;
    const k = 1 - Math.pow(0.001, delta); // frame-rate independent smoothing
    s.orbit += (orbitTarget - s.orbit) * k;
    s.zoom += (zoomTarget - s.zoom) * k;
    s.x += (pointer.x * (mobile ? 0.3 : 0.9) - s.x) * k * 0.6;
    s.y += (pointer.y * (mobile ? 0.2 : 0.55) - s.y) * k * 0.6;

    // velocity-based roll for a filmic feel
    const velRoll = THREE.MathUtils.clamp((scrollState.velocity || 0) * 0.004, -0.12, 0.12);
    s.roll += (velRoll - s.roll) * k * 0.5;

    // orbit around the focus point
    const dist = (CAM_Z - FOCUS_Z) - s.zoom;
    _pos.set(Math.sin(s.orbit) * dist, 0, Math.cos(s.orbit) * dist).add(FOCUS);
    _pos.x += s.x;
    _pos.y += s.y;

    camera.position.lerp(_pos, Math.min(1, delta * 6));
    camera.lookAt(FOCUS);
    camera.rotation.z += s.roll;
  });
  return null;
}

function SceneContents({ mobile, tier }) {
  return (
    <>
      <color attach="background" args={['#04060b']} />
      <fog attach="fog" args={['#04060b', 8, 30]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.9} color="#cfe0ff" />
      <pointLight position={[-6, -3, 2]} intensity={40} color="#2f6ee0" distance={30} />
      <pointLight position={[6, 4, -4]} intensity={30} color="#35e3e3" distance={30} />

      <Stars radius={80} depth={40} count={tier === 'low' ? 900 : 2200} factor={3} saturation={0} fade speed={0.4} />

      <CameraController mobile={mobile} />
      <DollyWorld mobile={mobile} />
      {tier !== 'low' && <FlyingEagle mobile={mobile} />}

      {tier === 'high' && (
        <EffectComposer disableNormalPass>
          <Bloom intensity={0.55} luminanceThreshold={0.55} luminanceSmoothing={0.2} mipmapBlur radius={0.7} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      )}
    </>
  );
}

export default function Scene({ mobile = false, tier = 'high' }) {
  const dpr = tier === 'low' ? [1, 1.3] : tier === 'mid' ? [1, 1.7] : [1, 2];
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: tier !== 'low', powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: mobile ? 62 : 52, near: 0.1, far: 120, position: [0, 0, CAM_Z] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <SceneContents mobile={mobile} tier={tier} />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
