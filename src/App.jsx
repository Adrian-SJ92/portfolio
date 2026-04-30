import './i18n';
import './styles/globals.css';
import { useState, useEffect, useCallback } from 'react';
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
import MatrixRain from './components/MatrixRain';
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
import useKonamiCode from './hooks/useKonamiCode';
import { burst } from './utils/burst';

const MATRIX_VARS = {
  '--accent':       '#00ff41',
  '--accent-glow':  'rgba(0,255,65,0.4)',
  '--accent-dim':   'rgba(0,255,65,0.15)',
  '--border':       'rgba(0,255,65,0.15)',
  '--border-hover': 'rgba(0,255,65,0.4)',
};

function applyMatrixTheme() {
  const root = document.documentElement;
  Object.entries(MATRIX_VARS).forEach(([k, v]) => root.style.setProperty(k, v));
}

function removeMatrixTheme() {
  const root = document.documentElement;
  Object.keys(MATRIX_VARS).forEach(k => root.style.removeProperty(k));
}

export default function App() {
  useScrollReveal();
  useScrambleTitles();

  const [konamiState, setKonamiState] = useState(null); // null | 'choosing' | 'blue' | 'red'
  const [matrixMode, setMatrixMode]   = useState(false);

  // Konami: if matrix mode is active → exit it. Otherwise → show pill choice.
  const handleKonami = useCallback(() => {
    if (matrixMode) {
      removeMatrixTheme();
      setMatrixMode(false);
    } else {
      setKonamiState('choosing');
    }
  }, [matrixMode]);

  useKonamiCode(handleKonami);

  const handleBluePill = useCallback(() => {
    setKonamiState('blue');
    setTimeout(() => setKonamiState(null), 2500);
  }, []);

  const handleRedPill = useCallback(() => {
    setKonamiState('red');
    setMatrixMode(true);
    applyMatrixTheme();
    const GREEN = ['0,255,65', '0,200,50', '0,255,65', '0,150,40', '200,255,200'];
    burst(window.innerWidth / 2, window.innerHeight / 2, 150, GREEN);
    // Hide overlay after 4s — matrix mode stays until next Konami
    setTimeout(() => setKonamiState(null), 4000);
  }, []);

  return (
    <>
      <ScrollProgress />
      {matrixMode ? <MatrixRain /> : <ParticleNetwork />}
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

      {konamiState === 'choosing' && (
        <div className="easter-egg">
          <div className="easter-egg__card">
            <div className="easter-egg__comment">// the_matrix.exe — elige tu destino</div>
            <div className="easter-egg__title">¿Cuál eliges?</div>
            <div className="easter-egg__pills">
              <button className="easter-egg__pill easter-egg__pill--blue" onClick={handleBluePill}>
                <span className="easter-egg__pill-icon">💊</span>
                <span className="easter-egg__pill-name">AZUL</span>
                <span className="easter-egg__pill-desc">Cerrar y olvidar que esto existe</span>
              </button>
              <button className="easter-egg__pill easter-egg__pill--red" onClick={handleRedPill}>
                <span className="easter-egg__pill-icon">💊</span>
                <span className="easter-egg__pill-name">ROJA</span>
                <span className="easter-egg__pill-desc">Ver hasta dónde llega la madriguera</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {konamiState === 'blue' && (
        <div className="easter-egg">
          <div className="easter-egg__card">
            <div className="easter-egg__comment">// process: sleep.exe</div>
            <div className="easter-egg__title" style={{ color: '#3b82f6' }}>Has elegido olvidar</div>
            <div className="easter-egg__sub">Dulces sueños. 💊</div>
          </div>
        </div>
      )}

      {konamiState === 'red' && (
        <div className="easter-egg">
          <div className="easter-egg__card" style={{ borderColor: '#00ff41', boxShadow: '0 0 60px rgba(0,255,65,0.4)' }}>
            <div className="easter-egg__comment" style={{ color: '#00ff41' }}>// welcome_to_the_matrix.exe</div>
            <div className="easter-egg__title" style={{ color: '#00ff41' }}>Bienvenido, Neo 🐇</div>
            <div className="easter-egg__sub">Vuelve a escribir el código para salir</div>
          </div>
        </div>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
}
