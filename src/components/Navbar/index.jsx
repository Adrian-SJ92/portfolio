import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const links = ['about', 'experience', 'education', 'skills', 'projects', 'contact'];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
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
                className="navbar__link"
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
