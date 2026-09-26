# KVK M SOLUTIONS — Cinematic 3D Website

A premium, cinematic 3D marketing site for **KVK M SOLUTIONS**, a software
development studio. The experience tells one continuous story —
**Idea → Design → Code → Database → Build → Test → Deploy → Product → Customer** —
over a single, persistent WebGL background that the camera dollies through as you
scroll.

## Tech stack

- **React 18** + **Vite** (JavaScript)
- **Three.js** + **@react-three/fiber** + **@react-three/drei** for the 3D scenes
- **@react-three/postprocessing** (Bloom / Vignette, high‑tier devices only)
- **GSAP** + **ScrollTrigger** for scroll choreography and reveals
- **Lenis** for premium smooth scrolling
- Plain CSS design system (`src/styles/global.css`)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## How it's put together

| Area | Files |
| --- | --- |
| App shell / section order / scroll lifecycle | `src/App.jsx` |
| Smooth scroll + shared scroll state | `src/lib/smoothScroll.js` |
| Persistent WebGL scene (dolly camera, fog depth, stars, flying eagle) | `src/three/Scene.jsx` |
| 3D "stages" the camera travels through | `src/three/stages.jsx` |
| Reusable procedural 3D props (monitor, database, server, phone, API net, code streams) | `src/three/objects.jsx` |
| Particle eagle (assembles from a scattered cloud) | `src/three/EagleParticles.jsx`, `src/lib/eagleShape.js` |
| Cinematic loader | `src/components/Loader.jsx` |
| Navbar / custom cursor / ambient sound toggle | `src/components/` |
| Reusable section transition | `src/components/CinematicTransition.jsx` |
| Content sections (story, technology, systems, craft, team, showcase, contact) | `src/sections/` |

### The "one continuous journey"

Every HTML section is transparent, sitting **on top of one fixed
`<Canvas>`**. As you scroll, `Scene.jsx` translates a world group along the
Z axis so the 3D stages emerge from and recede into fog — reading as a camera
travelling forward through a single environment rather than discrete
section→section cuts. The recurring eagle (loader, background fly‑through,
transitions, finale particle assembly) ties it together.

## The eagle logo

`public/eagle.svg` is a **placeholder** geometric eagle emblem. To use the real
KVK M SOLUTIONS brand mark:

- **2D uses** (navbar, transitions, finale image, favicon, OG image): replace
  `public/eagle.svg` with the real logo (keep the filename, or update the
  references in `index.html`, `Navbar.jsx`, `CinematicTransition.jsx`,
  `Showcase.jsx`, `Contact.jsx`).
- **Particle eagle** (loader / background / finale): the point cloud is
  generated procedurally in `src/lib/eagleShape.js`. To drive it from the real
  logo, sample points from the artwork (or a `.glb`) and return them from
  `generateEaglePoints()` — no component changes needed.

## Real 3D models (`.glb`)

The hero and creator scenes use **real glTF models** in `public/models/`, loaded
via drei's `useGLTF` in `src/three/models.jsx`:

- `macbook.glb` — photoreal laptop centerpiece (meshopt-compressed; drei decodes
  it automatically). **CC BY 4.0**, attribution required.
- `robot.glb` — the animated "maker" robot in the creator scene (CC0).

See **ATTRIBUTIONS.md** for full credits. Everything else in the scenes is
procedural, so the site still runs even if a model is missing.

**Studio look:** realism comes from procedural image-based lighting
(`<Environment>` + `<Lightformer>` in `src/three/Scene.jsx`, fully offline — no
HDR fetch), soft shadow-mapping, `<ContactShadows>` grounding, and a
Bloom + Depth-of-Field + Vignette post pipeline (scaled by device tier).

### Swap in your own models

Drop a `.glb` into `public/models/`, then point the path in
`src/three/models.jsx` at it. Models are normalized with drei's `<Resize>` so
you don't need to guess scale. Use models you own or that are licensed for
commercial use, and keep `ATTRIBUTIONS.md` current. Draco-compressed models
also work if you self-host the decoder (`useGLTF.setDecoderPath('/draco/')`).

## Performance

- Device **perf tier** (`src/lib/hooks.js`) scales particle counts, DPR,
  postprocessing and the background eagle.
- Far stages are frustum/distance‑culled; fog hides the seam.
- `AdaptiveDpr` / `AdaptiveEvents` drop resolution under load.
- `prefers-reduced-motion` is respected (Lenis + GSAP soften/disable).
- Mobile uses fewer polygons, particles and effects, and touch replaces hover.

## Accessibility & SEO

- Semantic landmarks, labelled controls, `alt` text, focus‑visible form fields.
- Custom cursor and heavy motion are disabled on touch / reduced‑motion.
- Full title, description, Open Graph / Twitter tags and JSON‑LD Organization
  data in `index.html`.

## Contact form

The form validates client‑side and, with no backend in this build, composes a
`mailto:` to `kvkmsolutionpvtltd@gmail.com`. Wire it to an API / form service by
replacing the submit handler in `src/sections/Contact.jsx`.

## Sound

Ambient audio is **off by default** and only starts on user interaction
(respecting autoplay policies). It's generated with the Web Audio API, so there
is no audio file to load.
