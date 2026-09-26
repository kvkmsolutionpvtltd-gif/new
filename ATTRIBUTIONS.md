# Third-party 3D model attributions

The site loads a few real glTF (`.glb`) models, in `public/models/`.

## macbook.glb — CC BY 4.0 (attribution required)

- **"MacBook Pro M3 16-inch 2024"** by **jackbaeten**
  — https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4
- Rigged / re-exported (hinge pivot, isolated screen node, meshopt compression)
  by **William Laverty** — https://github.com/william-laverty/rigged-macbook-3d
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribution required.
- Not affiliated with or endorsed by Apple Inc. "MacBook" is a trademark of
  Apple Inc., used nominatively to describe the model.

## robot.glb — CC0 (public domain)

- **"Robot Expressive"** by **Tomás Laulhé**, modifications by **Don McCurdy**.
- From the three.js examples — https://github.com/mrdoob/three.js
- **License:** [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) —
  no attribution required (credited here as courtesy).

---

To replace these with your own models, drop a `.glb` into `public/models/` and
update the path in `src/three/models.jsx`. Use models you own or that are
licensed for commercial use; keep this file up to date.
