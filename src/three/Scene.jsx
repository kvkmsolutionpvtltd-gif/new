import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, AdaptiveDpr, AdaptiveEvents, Environment, Lightformer, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { scrollState } from '../lib/smoothScroll';
import { STAGES } from './stages';
import { Monitor, Phone, DatabaseStack, NodeNetwork } from './objects';
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

/** Calm ambient world for inner pages — a few floating props, no scroll dolly. */
function AmbientWorld({ mobile }) {
  return (
    <group position={[0, 0, -4]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
        <Monitor position={[mobile ? 0 : 3.2, 0.6, -1]} scale={mobile ? 0.7 : 0.9} rotation={[0, -0.5, 0]} />
      </Float>
      {!mobile && (
        <>
          <Float speed={1.3} floatIntensity={0.7}><Phone position={[-3.6, -0.6, 0]} scale={0.8} rotation={[0.1, 0.5, 0]} /></Float>
          <Float speed={0.9} floatIntensity={0.6}><DatabaseStack position={[-3, 1.4, -2]} scale={0.4} /></Float>
          <Float speed={1.1} floatIntensity={0.6}><NodeNetwork position={[3, -1.4, -2]} radius={2.6} count={7} scale={0.5} /></Float>
        </>
      )}
    </group>
  );
}

/** Gentle drifting camera for ambient mode (no scroll coupling). */
function AmbientCamera({ mobile }) {
  const { camera } = useThree();
  const smooth = useRef({ x: 0, y: 0 });
  useMemo(() => {
    camera.position.set(0, 0, CAM_Z);
    camera.lookAt(FOCUS);
  }, [camera]);
  useFrame(({ pointer, clock }, delta) => {
    const t = clock.elapsedTime;
    const s = smooth.current;
    const k = 1 - Math.pow(0.002, delta);
    s.x += (pointer.x * (mobile ? 0.4 : 1) + Math.sin(t * 0.1) * 0.6 - s.x) * k * 0.5;
    s.y += (pointer.y * (mobile ? 0.25 : 0.6) + Math.cos(t * 0.08) * 0.3 - s.y) * k * 0.5;
    camera.position.x += (s.x - camera.position.x) * Math.min(1, delta * 3);
    camera.position.y += (s.y - camera.position.y) * Math.min(1, delta * 3);
    camera.lookAt(FOCUS);
  });
  return null;
}

function SceneContents({ mobile, tier, mode }) {
  const ambient = mode === 'ambient';
  return (
    <>
      <color attach="background" args={['#04060b']} />
      <fog attach="fog" args={['#04060b', 9, 32]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={1.6}
        color="#eaf2ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-6, -3, 2]} intensity={40} color="#2f6ee0" distance={30} />
      <pointLight position={[6, 4, -4]} intensity={30} color="#35e3e3" distance={30} />

      {/* Studio image-based lighting — procedural, fully offline (no HDR fetch).
          Gives real reflections on the glass/metal GLB models. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} position={[0, 5, -7]} scale={[12, 8, 1]} color="#9ec2ff" />
        <Lightformer intensity={1.6} position={[-7, 2, 3]} scale={[8, 8, 1]} color="#ffffff" />
        <Lightformer intensity={1.3} position={[7, -1, 3]} scale={[8, 8, 1]} color="#35e3e3" />
        <Lightformer intensity={1.1} form="ring" position={[0, 0, -9]} scale={7} color="#8a6cff" />
      </Environment>

      <Stars radius={80} depth={40} count={tier === 'low' ? 900 : 2200} factor={3} saturation={0} fade speed={0.4} />

      {ambient ? <AmbientCamera mobile={mobile} /> : <CameraController mobile={mobile} />}
      {ambient ? <AmbientWorld mobile={mobile} /> : <DollyWorld mobile={mobile} />}
      {tier !== 'low' && <FlyingEagle mobile={mobile} />}

      {tier !== 'low' && (
        <EffectComposer disableNormalPass>
          <Bloom intensity={0.6} luminanceThreshold={0.5} luminanceSmoothing={0.22} mipmapBlur radius={0.75} />
          {tier === 'high' && !ambient ? (
            <DepthOfField target={[0, 0, FOCUS_Z]} focalLength={0.02} bokehScale={2.6} height={480} />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.22} darkness={0.9} />
        </EffectComposer>
      )}
    </>
  );
}

export default function Scene({ mobile = false, tier = 'high', mode = 'home' }) {
  const dpr = tier === 'low' ? [1, 1.3] : tier === 'mid' ? [1, 1.7] : [1, 2];
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows
        gl={{ antialias: tier !== 'low', powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: mobile ? 62 : 52, near: 0.1, far: 120, position: [0, 0, CAM_Z] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Suspense fallback={null}>
          <SceneContents mobile={mobile} tier={tier} mode={mode} />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
