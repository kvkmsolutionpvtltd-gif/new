import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import OpeningSequence from './components/OpeningSequence';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import SoundToggle from './components/SoundToggle';
import ScrollProgress from './components/ScrollProgress';
import PageTransition from './components/PageTransition';
import Footer from './components/Footer';
import Scene from './three/Scene';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Solutions from './pages/Solutions';
import Technologies from './pages/Technologies';
import CaseStudies from './pages/CaseStudies';
import Process from './pages/Process';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import { initSmoothScroll, destroySmoothScroll, stopScroll, startScroll } from './lib/smoothScroll';
import { useIsMobile, getPerfTier, usePrefersReducedMotion } from './lib/hooks';

gsap.registerPlugin(ScrollTrigger);

function Layout() {
  const [loaded, setLoaded] = useState(false);
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const [tier] = useState(() => getPerfTier());
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    initSmoothScroll({ reducedMotion: reduced });
    stopScroll();
    window.scrollTo(0, 0);
    return () => destroySmoothScroll();
  }, [reduced]);

  useEffect(() => {
    if (!loaded) return;
    startScroll();
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 60);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <OpeningSequence onDone={() => setLoaded(true)} />}

      <Scene mobile={mobile} tier={tier} mode={isHome ? 'home' : 'ambient'} />

      {/* Always-on cinematic overlay (film grain + vignette) */}
      <div className="cine" aria-hidden="true">
        <div className="cine__vignette" />
        <div className="cine__scan" />
        <div className="cine__grain" />
      </div>

      <Cursor />
      <Navbar />
      <SoundToggle />
      {isHome && loaded && <ScrollProgress />}
      <PageTransition />

      <main className="content" aria-hidden={!loaded}>
        <Routes>
          <Route path="/" element={<Home started={loaded} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/process" element={<Process />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
