import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Real GLB models (downloaded to /public/models). drei's useGLTF handles the
 * MacBook's meshopt compression automatically. Cloned per instance.
 *
 * Attribution (CC-BY 4.0): "MacBook Pro M3 16-inch 2024" by jackbaeten,
 * rigged by William Laverty. See ATTRIBUTIONS.md.
 */

const MACBOOK = './models/macbook.glb';

useGLTF.preload(MACBOOK);

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
