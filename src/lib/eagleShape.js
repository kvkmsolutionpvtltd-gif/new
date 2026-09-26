/**
 * Procedural eagle point cloud.
 *
 * Generates a symmetric, front-facing spread-wing eagle silhouette as an
 * array of 3D points. Used by the particle eagle so the brand mark can
 * "assemble from particles" during loading and transitions.
 *
 * The shape is defined as 2D silhouette bands (x from center-out, y range)
 * mirrored across the vertical axis, then given a little z depth so it reads
 * as a volumetric mark rather than a flat sprite. Swap this out for sampled
 * points from a real eagle .glb / logo later without touching the components.
 */

// A silhouette described by horizontal slabs: [yTop, yBottom, xInner, xOuter]
// Coordinates are roughly normalized to a ~2.4 unit tall mark.
const BANDS = [
  // head
  [1.15, 0.98, 0.0, 0.16],
  [0.98, 0.86, 0.0, 0.2],
  // beak
  [0.86, 0.78, 0.0, 0.07],
  // shoulders / wing roots
  [0.78, 0.66, 0.0, 0.95],
  [0.66, 0.54, 0.0, 1.3],
  // mid wings (widest)
  [0.54, 0.4, 0.14, 1.55],
  [0.4, 0.26, 0.16, 1.42],
  // lower wings
  [0.26, 0.12, 0.16, 1.15],
  [0.12, -0.02, 0.14, 0.82],
  // body
  [-0.02, -0.4, 0.0, 0.34],
  // tail
  [-0.4, -0.78, 0.0, 0.26],
  [-0.78, -1.05, 0.0, 0.14],
];

/**
 * @param {number} count desired number of points
 * @param {number} scale overall scale multiplier
 * @returns {Float32Array} xyz triples
 */
export function generateEaglePoints(count = 4000, scale = 1) {
  const pts = new Float32Array(count * 3);
  // total silhouette area weight per band to distribute points naturally
  const weights = BANDS.map((b) => {
    const h = Math.abs(b[0] - b[1]);
    const w = b[3] - b[2];
    return h * (w * 2 + 0.05);
  });
  const total = weights.reduce((a, b) => a + b, 0);

  let i = 0;
  while (i < count) {
    // choose a band by weight
    let r = Math.random() * total;
    let band = BANDS[0];
    for (let b = 0; b < BANDS.length; b++) {
      r -= weights[b];
      if (r <= 0) {
        band = BANDS[b];
        break;
      }
    }
    const [yTop, yBot, xIn, xOut] = band;
    const y = yBot + Math.random() * (yTop - yBot);
    // taper the outer edge along the band for a feathered look
    const t = (y - yBot) / (yTop - yBot || 1);
    const outer = xIn + (xOut - xIn) * (0.85 + 0.15 * Math.sin(t * Math.PI));
    const x = xIn + Math.random() * (outer - xIn);
    const side = Math.random() < 0.5 ? -1 : 1;
    // depth: more depth on body, thin on wing tips
    const depthAmp = 0.12 + 0.18 * (1 - Math.min(1, Math.abs(x) / 1.5));
    const z = (Math.random() - 0.5) * depthAmp;

    pts[i * 3] = side * x * scale;
    pts[i * 3 + 1] = y * scale;
    pts[i * 3 + 2] = z * scale;
    i++;
  }
  return pts;
}

/** A loose spherical cloud of the same count — used as the "scattered" state. */
export function generateScatter(count = 4000, radius = 3.2) {
  const pts = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(Math.random());
    pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pts[i * 3 + 2] = r * Math.cos(phi);
  }
  return pts;
}
