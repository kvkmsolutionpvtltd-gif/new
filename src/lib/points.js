/**
 * Sample a point cloud from rendered text — used by the opening sequence to
 * spell "KVK" → "M" → "SOLUTIONS" out of particles, then morph to the eagle.
 *
 * Renders the text to an offscreen canvas, reads opaque pixels and returns
 * exactly `count` normalized 3D points (x in ~[-aspect,aspect], y in [-1,1]).
 */
export function sampleTextPoints(text, count, { fontWeight = 700, fontFamily = 'Space Grotesk, Arial, sans-serif' } = {}) {
  const W = 1000;
  const H = 300;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // fit font size to width
  let size = 220;
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  let m = ctx.measureText(text);
  const maxW = W * 0.86;
  if (m.width > maxW) {
    size = Math.floor(size * (maxW / m.width));
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  }
  ctx.fillText(text, W / 2, H / 2 + size * 0.02);

  const data = ctx.getImageData(0, 0, W, H).data;
  const opaque = [];
  const step = 3; // sample density
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const a = data[(y * W + x) * 4 + 3];
      if (a > 128) opaque.push([x, y]);
    }
  }

  const out = new Float32Array(count * 3);
  const aspect = W / H;
  if (opaque.length === 0) return out;
  for (let i = 0; i < count; i++) {
    const [px, py] = opaque[(Math.random() * opaque.length) | 0];
    // normalize: x -> [-aspect, aspect], y -> [1,-1] (flip)
    out[i * 3] = ((px / W) * 2 - 1) * aspect;
    out[i * 3 + 1] = -((py / H) * 2 - 1);
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
  }
  return out;
}
