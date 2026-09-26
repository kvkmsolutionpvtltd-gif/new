import { useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Real GLB models (downloaded to /public/models). drei's useGLTF handles the
 * MacBook's meshopt compression automatically. Models are cloned per instance
 * (except the animated robot, which stays a single live instance so its
 * skeletal animation plays).
 *
 * Attribution (CC-BY 4.0): "MacBook Pro M3 16-inch 2024" by jackbaeten,
 * rigged by William Laverty. See ATTRIBUTIONS.md.
 */

const MACBOOK = './models/macbook.glb';
const ROBOT = './models/robot.glb';

useGLTF.preload(MACBOOK);
useGLTF.preload(ROBOT);

function prepShadows(root) {
  root.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
}

export function Macbook({ screenColor = '#2f6ee0', ...props }) {
  const { scene } = useGLTF(MACBOOK);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    prepShadows(s);
    s.traverse((o) => {
      if (o.isMesh && /screen|display|panel/i.test(o.name)) {
        o.material = o.material.clone();
        o.material.emissive = new THREE.Color(screenColor);
        o.material.emissiveIntensity = 1.1;
        o.material.toneMapped = false;
      }
    });
    return s;
  }, [scene, screenColor]);
  return <primitive object={cloned} {...props} />;
}

export function Robot({ animation = 'Idle', ...props }) {
  const { scene, animations } = useGLTF(ROBOT);
  const { actions, names } = useAnimations(animations, scene);
  useEffect(() => {
    prepShadows(scene);
  }, [scene]);
  useEffect(() => {
    const name = actions[animation] ? animation : names[0];
    const a = actions[name];
    a?.reset().fadeIn(0.4).play();
    return () => a?.fadeOut(0.3);
  }, [actions, names, animation]);
  return <primitive object={scene} {...props} />;
}
