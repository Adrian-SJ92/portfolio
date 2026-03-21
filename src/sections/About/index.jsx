import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import avatarImg from '../../assets/avatar.jpg';
import './About.css';

const stats = [
  { key: 'yearsLabel', value: '2+', num: 2 },
  { key: 'projectsLabel', value: '10+', num: 10 },
  { key: 'techLabel', value: '8+', num: 8 },
];

function Counter({ num, suffix, trigger }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let current = 0;
    const step = num / (1200 / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= num) { setDisplay(num); clearInterval(timer); }
      else setDisplay(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, num]);

  return <>{display}{suffix}</>;
}

function useTypewriter(phrases) {
  const [text, setText] = useState('');
  const state = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timeout;
    const tick = () => {
      const { phraseIdx, charIdx, deleting } = state.current;
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        const next = charIdx + 1;
        setText(phrase.slice(0, next));
        state.current.charIdx = next;
        if (next === phrase.length) {
          state.current.deleting = true;
          timeout = setTimeout(tick, 2200);
        } else {
          timeout = setTimeout(tick, 75);
        }
      } else {
        const next = charIdx - 1;
        setText(phrase.slice(0, next));
        state.current.charIdx = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.phraseIdx = (phraseIdx + 1) % phrases.length;
          timeout = setTimeout(tick, 300);
        } else {
          timeout = setTimeout(tick, 35);
        }
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, []);

  return text;
}

const typewriterPhrases = [
  'Construyendo con IA en Solbyte',
  'Apasionado por el código limpio',
  'Fullstack · Frontend · Backend',
  'Siempre aprendiendo, siempre construyendo',
];

export default function About() {
  const { t } = useTranslation();
  const statsRef = useRef(null);
  const [counterStarted, setCounterStarted] = useState(false);
  const typeText = useTypewriter(typewriterPhrases);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCounterStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" data-reveal>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">{t('about.subtitle')}</p>
          <h2 className="section-title">{t('about.title')}</h2>
        </div>

        <div className="about__grid">
          <div className="about__visual">
            <div className="about__avatar">
              <div className="about__avatar-ring" />
              <div className="about__avatar-inner">
                <img src={avatarImg} alt="Adrian" className="about__avatar-photo" />
              </div>
              <div className="about__avatar-glow" />
            </div>

            <div className="about__stats" ref={statsRef}>
              {stats.map(({ key, num, value }) => {
                const suffix = value.replace(/[0-9]/g, '');
                return (
                  <div key={key} className="glass-card about__stat">
                    <span className="about__stat-value">
                      <Counter num={num} suffix={suffix} trigger={counterStarted} />
                    </span>
                    <span className="about__stat-label">{t(`about.${key}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="about__text">
            <div className="about__typewriter">
              <span className="about__typewriter-prompt">{'>'}</span>
              <span className="about__typewriter-text">{typeText}</span>
              <span className="about__typewriter-cursor">|</span>
            </div>
            <p>{t('about.bio1')}</p>
            <p>{t('about.bio2')}</p>

            <div className="about__tags">
              {['React', 'PHP', 'Laravel', 'Filament', 'Node.js', 'MySQL', 'MongoDB', 'SQLite', 'JavaScript', 'CSS', 'HTML', 'REST APIs', 'n8n', 'Git'].map(tag => (
                <span key={tag} className="about__tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
