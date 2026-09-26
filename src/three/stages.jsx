import { Float } from '@react-three/drei';
import {
  Monitor,
  Panel,
  DatabaseStack,
  ServerRack,
  Phone,
  NodeNetwork,
  CodeStreams,
  IdeaCore,
  FloatCard,
  WireBox,
} from './objects';
import EagleParticles from './EagleParticles';

/**
 * The ordered 3D "stages" the camera dollies through. Each entry is a
 * component rendered inside a Stage wrapper at a fixed depth. They map loosely
 * to the HTML story sections so the environment shifts as you scroll — the
 * "one continuous journey" the brief calls for.
 *
 * Kept procedural + wireframe/emissive so it stays fast and needs no assets.
 * Swap any group for a loaded .glb later.
 */

function S({ children }) {
  return <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>{children}</Float>;
}

// 1. HERO — floating developer workstation
export function StageHero({ mobile }) {
  return (
    <group>
      <S>
        <Monitor position={[0, 0.3, 0]} scale={mobile ? 0.9 : 1.15} rotation={[0, -0.15, 0]} />
      </S>
      <S><Panel w={1.6} h={1} position={[-3, 1.2, -1.5]} rotation={[0, 0.4, 0]} edge="#35e3e3" /></S>
      <S><Panel w={1.4} h={0.9} position={[3.1, -0.6, -1]} rotation={[0, -0.4, 0]} /></S>
      <S><Phone position={[3, 1.4, -0.5]} scale={0.8} rotation={[0.1, -0.5, 0.1]} /></S>
      <S><DatabaseStack position={[-3.2, -1.2, -2]} scale={0.5} /></S>
      {!mobile && <S><NodeNetwork position={[0, 0, -4]} radius={4} count={7} scale={0.7} /></S>}
    </group>
  );
}

// 2. IDEA becomes software
export function StageIdea() {
  return (
    <group>
      <S><IdeaCore position={[0, 0.2, 0]} scale={1.3} /></S>
      {['UX', 'UI', 'API', 'DB'].map((_, i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <S key={i}>
            <WireBox position={[Math.cos(a) * 3, Math.sin(a) * 1.6, -1]} w={0.6} h={0.6} d={0.6} color={i % 2 ? '#35e3e3' : '#3a8dff'} />
          </S>
        );
      })}
    </group>
  );
}

// 3. DESIGN studio — screens rotating around
export function StageDesign() {
  return (
    <group>
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <S key={i}>
            <Panel w={1.3} h={1.7} position={[Math.cos(a) * 3.4, Math.sin(a * 0.5) * 0.8, Math.sin(a) * 2 - 1]} rotation={[0, -a + Math.PI / 2, 0]} edge={i % 2 ? '#8a6cff' : '#3a8dff'} />
          </S>
        );
      })}
    </group>
  );
}

// 4. MASSIVE code scene
export function StageCode() {
  return (
    <group>
      <CodeStreams columns={44} height={22} />
      <S><Monitor position={[0, 0, -2]} scale={1} rotation={[0, 0.2, 0]} /></S>
    </group>
  );
}

// 5. DATABASE flow
export function StageDatabase() {
  return (
    <group>
      <S><Phone position={[-4, 0, 0]} scale={1} /></S>
      <S><WireBox position={[-1.3, 0.2, -0.5]} w={0.9} h={0.9} d={0.9} color="#35e3e3" /></S>
      <S><ServerRack position={[1.5, -0.2, -0.5]} scale={0.7} /></S>
      <S><DatabaseStack position={[4, 0, -0.5]} scale={0.8} /></S>
    </group>
  );
}

// 6. API architecture
export function StageApi({ mobile }) {
  return (
    <group>
      <S><NodeNetwork radius={mobile ? 3.4 : 4.6} count={mobile ? 8 : 12} scale={1} /></S>
    </group>
  );
}

// 7. Build / servers
export function StageBuild() {
  return (
    <group>
      {[-2.4, 0, 2.4].map((x, i) => (
        <S key={i}><ServerRack position={[x, 0, 0]} scale={0.85} /></S>
      ))}
      <CodeStreams columns={16} height={16} color="#35e3e3" position={[0, 0, -6]} />
    </group>
  );
}

// 8. Devices / mobile
export function StageDevices({ mobile }) {
  return (
    <group>
      <S><Phone position={[0, 0, 0]} scale={1.3} /></S>
      {!mobile && (
        <>
          <S><Phone position={[-2.6, 0.4, -1]} scale={0.9} screen="#122b1f" /></S>
          <S><Phone position={[2.6, -0.3, -1]} scale={0.9} screen="#2a1230" /></S>
          <S><Panel w={2.4} h={1.5} position={[0, 0, -3]} edge="#35e3e3" /></S>
        </>
      )}
    </group>
  );
}

// 9. Team / product cards
export function StageCards() {
  const colors = ['#3a8dff', '#35e3e3', '#8a6cff', '#9fb2cc'];
  return (
    <group>
      {colors.map((c, i) => (
        <S key={i}>
          <FloatCard position={[(i - 1.5) * 2.1, Math.sin(i) * 0.4, -0.5]} edge={c} rotation={[0, (i - 1.5) * 0.15, 0]} />
        </S>
      ))}
    </group>
  );
}

// 10. Final showcase — everything + eagle
export function StageShowcase({ mobile }) {
  return (
    <group>
      <EagleParticles count={mobile ? 2600 : 4600} assemble={1} scale={1.5} size={0.03} />
      {!mobile && (
        <>
          <S><Phone position={[-4.5, 1.5, -2]} scale={0.7} /></S>
          <S><DatabaseStack position={[4.4, -1.4, -2]} scale={0.5} /></S>
          <S><Panel w={1.4} h={0.9} position={[4.2, 1.6, -2]} rotation={[0, -0.5, 0]} /></S>
          <S><ServerRack position={[-4.2, -1.6, -2]} scale={0.5} /></S>
        </>
      )}
    </group>
  );
}

/** The ordered list consumed by Scene. */
export const STAGES = [
  StageHero,
  StageIdea,
  StageDesign,
  StageCode,
  StageDatabase,
  StageApi,
  StageBuild,
  StageDevices,
  StageCards,
  StageShowcase,
];
