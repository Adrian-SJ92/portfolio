import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const links = ['about', 'experience', 'education', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('');
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 20);
      // Hide on scroll down (only if menu is closed and past 80px)
      if (!menuOpen) setHidden(y > lastY.current && y > 80);
      lastY.current = y;

      // Active section: last section whose top is above 120px
      let current = '';
      for (const id of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
      <div className="navbar__container">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          Dev
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link}`}
                className={`navbar__link ${activeSection === link ? 'navbar__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(`nav.${link}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__lang" onClick={toggleLang} aria-label="Toggle language">
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
