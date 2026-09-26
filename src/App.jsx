import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import SoundToggle from './components/SoundToggle';
import CinematicTransition from './components/CinematicTransition';
import Scene from './three/Scene';

import Hero from './sections/Hero';
import { IdeaSection, DesignSection, CreativeSection, DeveloperSection } from './sections/Story';
import { TechnologySection, MassiveCodeSection, DayNightSection } from './sections/Technology';
import { DatabaseSection, ApiSection, BuildSection, EcommerceSection, PaymentSection } from './sections/Systems';
import { GameSection, BlenderSection, WebsiteSection, MobileSection } from './sections/Craft';
import { TeamSection, PipelineSection, TestingSection, DeploymentSection } from './sections/Team';
import { ShowcaseSection, FinalHeroSection } from './sections/Showcase';
import { ContactSection, FinaleSection } from './sections/Contact';

import { initSmoothScroll, destroySmoothScroll, stopScroll, startScroll } from './lib/smoothScroll';
import { useIsMobile, getPerfTier, usePrefersReducedMotion } from './lib/hooks';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const [tier] = useState(() => getPerfTier());

  // Smooth scroll lifecycle
  useEffect(() => {
    initSmoothScroll({ reducedMotion: reduced });
    // lock scroll until loader finishes
    stopScroll();
    window.scrollTo(0, 0);
    return () => destroySmoothScroll();
  }, [reduced]);

  useEffect(() => {
    if (!loaded) return;
    startScroll();
    // content is in; recalc triggers a couple of times as layout settles
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 60);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', onLoad);
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {/* Persistent WebGL background — the continuous camera journey */}
      <Scene mobile={mobile} tier={tier} />

      <Cursor />
      <Navbar />
      <SoundToggle />

      <main className="content" aria-hidden={!loaded}>
        <Hero started={loaded} />

        <IdeaSection />
        <CinematicTransition variant="eagle" label="Design" />

        <DesignSection />
        <CreativeSection />
        <DeveloperSection />
        <CinematicTransition variant="code" label="Engineering" />

        <TechnologySection />
        <MassiveCodeSection />
        <DayNightSection />
        <CinematicTransition variant="streak" label="Systems" />

        <DatabaseSection />
        <ApiSection />
        <BuildSection />
        <EcommerceSection />
        <PaymentSection />
        <CinematicTransition variant="eagle" label="Craft" />

        <GameSection />
        <BlenderSection />
        <WebsiteSection />
        <MobileSection />
        <CinematicTransition variant="code" label="Team & Process" />

        <TeamSection />
        <PipelineSection />
        <TestingSection />
        <DeploymentSection />
        <CinematicTransition variant="streak" label="The Reveal" />

        <ShowcaseSection />
        <FinalHeroSection />

        <ContactSection />
        <FinaleSection />
      </main>
    </>
  );
}
