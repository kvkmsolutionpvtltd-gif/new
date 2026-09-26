import { Float } from '@react-three/drei';
import {
  Monitor,
  Panel,
  DatabaseStack,
  ServerRack,
  Phone,
  NodeNetwork,
  CodeStreams,
  WireBox,
} from './objects';
import {
  IdeaSplit,
  LayerStack,
  ComponentAssembly,
  DataTunnel,
  DeviceSplit,
  BuildFactory,
  CardGame,
  MorphObject,
  TestChambers,
  CloudDeploy,
  ProductRing,
  AppsShowcase,
  WebsiteShowcase,
  LogoShowcase,
} from './scenes';
import CreatorScene from './Creator';
import EagleParticles from './EagleParticles';

/**
 * Ordered 3D scenes the camera dollies/orbits through — one continuous
 * software universe. Purely procedural; no humans, no external assets.
 */

function S({ children, ...p }) {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6} {...p}>
      {children}
    </Float>
  );
}

// 0. HERO — the digital universe (everything floating together)
export function StageHero({ mobile }) {
  return (
    <group>
      <S><Monitor position={[0, 0.3, 0]} scale={mobile ? 0.9 : 1.15} rotation={[0, -0.15, 0]} /></S>
      <S><Panel w={1.6} h={1} position={[-3.2, 1.3, -1.5]} rotation={[0, 0.4, 0]} edge="#35e3e3" /></S>
      <S><Phone position={[3, 1.3, -0.5]} scale={0.8} rotation={[0.1, -0.5, 0.1]} /></S>
      <S><DatabaseStack position={[-3.2, -1.4, -2]} scale={0.5} /></S>
      <S><ServerRack position={[3.4, -1.2, -2]} scale={0.5} /></S>
      {!mobile && <S><NodeNetwork position={[0, 0, -5]} radius={4.5} count={8} scale={0.7} /></S>}
    </group>
  );
}

// CREATOR — a stylized human builds an app at a neat PC; output flies out in 3D
export function StageCreator({ mobile }) {
  return (
    <group rotation={[0, mobile ? 0.25 : 0.42, 0]} position={[mobile ? 0 : -0.4, 0.2, 0]}>
      <CreatorScene mobile={mobile} scale={mobile ? 0.95 : 1.15} />
    </group>
  );
}

// 1. IDEA
export function StageIdea() {
  return <S><IdeaSplit scale={1.1} /></S>;
}

// APPS / WEBSITE / LOGO — dedicated deliverable showcases
export function StageApps({ mobile }) {
  return <S><AppsShowcase mobile={mobile} scale={mobile ? 0.8 : 1} /></S>;
}
export function StageWebsiteShowcase() {
  return <S><WebsiteShowcase scale={0.9} /></S>;
}
export function StageLogo({ mobile }) {
  return <LogoShowcase mobile={mobile} scale={1} />;
}

// 2. DESIGN — screens rotating around
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

// 3. PHOTOSHOP / CANVA — layer stacks
export function StageLayers({ mobile }) {
  return (
    <group>
      <S><LayerStack scale={1.1} position={[mobile ? 0 : -1.6, 0, 0]} /></S>
      {!mobile && <S><LayerStack scale={0.8} color="#3a8dff" position={[2.4, 0.4, -1.5]} rotation={[0, 0.6, 0]} /></S>}
    </group>
  );
}

// 4. WEBSITE CODING — monitor + code portal
export function StageWebsite() {
  return (
    <group>
      <CodeStreams columns={30} height={20} />
      <S><Monitor position={[0, 0, -1]} scale={1.15} rotation={[0, 0.15, 0]} /></S>
      <S><Panel w={4} h={2.4} position={[0, 0, -5]} edge="#35e3e3" glow={0.8} /></S>
    </group>
  );
}

// 5. REACT — component assembly
export function StageReact() {
  return <S><ComponentAssembly scale={0.85} /></S>;
}

// 6. NODE.JS — data tunnel
export function StageBackend() {
  return (
    <group>
      <DataTunnel scale={1} rotation={[0, 0, 0]} />
      <S><ServerRack position={[3.2, 0, -1]} scale={0.6} /></S>
    </group>
  );
}

// 7. FLUTTER / REACT NATIVE — device split
export function StageDevices({ mobile }) {
  return <DeviceSplit scale={1} mobile={mobile} />;
}

// 8. GRADLE / BUILD — build factory
export function StageBuild() {
  return (
    <group>
      <S><BuildFactory scale={1.1} /></S>
      {[-3.2, 3.2].map((x, i) => (
        <S key={i}><ServerRack position={[x, -0.2, -1]} scale={0.6} /></S>
      ))}
    </group>
  );
}

// 9. DATABASE
export function StageDatabase({ mobile }) {
  return (
    <group>
      <S><DatabaseStack scale={1.3} /></S>
      {!mobile &&
        [...Array(4)].map((_, i) => (
          <S key={i}><WireBox position={[(i - 1.5) * 2.4, 2, -2]} w={1.6} h={0.1} d={1} color="#35e3e3" /></S>
        ))}
    </group>
  );
}

// 10. API — the network
export function StageApi({ mobile }) {
  return <S><NodeNetwork radius={mobile ? 3.4 : 4.8} count={mobile ? 8 : 12} scale={1} /></S>;
}

// 11. E-COMMERCE — products orbiting + phone
export function StageEcommerce({ mobile }) {
  return (
    <group>
      <S><Phone position={[0, 0, 0]} scale={1.2} /></S>
      <ProductRing scale={mobile ? 0.8 : 1} count={mobile ? 5 : 8} />
    </group>
  );
}

// 12. GAME / CARD GAME
export function StageGame() {
  return (
    <group>
      <S><CardGame scale={1.1} /></S>
      {[...Array(3)].map((_, i) => (
        <S key={i}><WireBox position={[(i - 1) * 3, 1.8, -2]} w={0.8} h={0.8} d={0.8} color={i % 2 ? '#8a6cff' : '#35e3e3'} /></S>
      ))}
    </group>
  );
}

// 13. BLENDER / 3D — morphing object
export function Stage3D() {
  return <S><MorphObject scale={1.1} /></S>;
}

// 14. TESTING / DEBUG
export function StageTesting() {
  return <TestChambers scale={1} />;
}

// 15. DEPLOYMENT — cloud
export function StageDeploy() {
  return <S><CloudDeploy scale={1.1} /></S>;
}

// 16. FINAL UNIVERSE + EAGLE
export function StageShowcase({ mobile }) {
  return (
    <group>
      <EagleParticles count={mobile ? 2800 : 5000} assemble={1} scale={1.6} size={0.03} />
      {!mobile && (
        <>
          <S><Phone position={[-4.6, 1.6, -2]} scale={0.7} /></S>
          <S><DatabaseStack position={[4.6, -1.5, -2]} scale={0.5} /></S>
          <S><Panel w={1.4} h={0.9} position={[4.4, 1.7, -2]} rotation={[0, -0.5, 0]} /></S>
          <S><ServerRack position={[-4.4, -1.7, -2]} scale={0.5} /></S>
          <S><MorphObject position={[0, 2.6, -3]} scale={0.4} /></S>
        </>
      )}
    </group>
  );
}

export const STAGES = [
  StageHero,            // 0
  StageCreator,         // 1  — human builds app, output flies out
  StageIdea,            // 2
  StageDesign,          // 3
  StageLayers,          // 4
  StageWebsite,         // 5
  StageReact,           // 6
  StageBackend,         // 7
  StageDevices,         // 8
  StageBuild,           // 9
  StageDatabase,        // 10
  StageApi,             // 11
  StageEcommerce,       // 12
  StageGame,            // 13
  Stage3D,              // 14
  StageTesting,         // 15
  StageDeploy,          // 16
  StageApps,            // 17 — deliverable showcase
  StageWebsiteShowcase, // 18
  StageLogo,            // 19
  StageShowcase,        // 20 — final universe + eagle
];
