import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#hero" className="footer__logo">
          <span className="footer__logo-bracket">&lt;</span>
          Dev
          <span className="footer__logo-bracket">/&gt;</span>
        </a>
        <p className="footer__copy">
          © {year} Adrian. {t('footer.rights')}
        </p>
        <p className="footer__made">
          Made with <span className="footer__heart">♥</span> & React
        </p>
        <p className="footer__secret">// ¿conoces el código?</p>
      </div>
    </footer>
  );
}
