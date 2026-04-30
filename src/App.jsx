import './i18n';
import './styles/globals.css';
import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      setPct(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9999,
      width: `${pct}%`, height: '2px',
      background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
      boxShadow: '0 0 8px var(--accent-glow)',
      transition: 'width 0.1s linear',
      pointerEvents: 'none',
    }} />
  );
}
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ParticleNetwork from './components/ParticleNetwork';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';
import useScrambleTitles from './hooks/useScrambleTitles';

export default function App() {
  useScrollReveal();
  useScrambleTitles();

  return (
    <>
      <ScrollProgress />
      <ParticleNetwork />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
