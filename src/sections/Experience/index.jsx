import { useTranslation } from 'react-i18next';
import './Experience.css';

const experiences = [
  {
    key: 'solbyte',
    company: 'Solbyte S.L.',
    companyUrl: 'https://www.solbyte.com/',
    location: 'Málaga',
    period: 'Nov 2025 – Presente',
    current: true,
    tags: ['PHP', 'Laravel', 'Filament', 'MongoDB', 'n8n', 'IA'],
  },
  {
    key: 'freelance',
    company: 'Freelance',
    companyUrl: null,
    location: 'Remoto',
    period: 'Jun 2024 – Oct 2025',
    current: false,
    tags: ['React', 'Node.js', 'MySQL', 'REST APIs', 'JavaScript'],
  },
];

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="experience" data-reveal>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">{t('experience.subtitle')}</p>
          <h2 className="section-title">{t('experience.title')}</h2>
        </div>

        <div className="experience__timeline">
          {experiences.map(({ key, company, companyUrl, location, period, current, tags }, i) => (
            <div key={key} className="experience__item">
              <div className="experience__line">
                <div className={`experience__dot ${current ? 'experience__dot--active' : ''}`} />
                {i < experiences.length - 1 && <div className="experience__connector" />}
              </div>

              <div className="glass-card experience__card">
                <div className="experience__card-header">
                  <div>
                    <h3 className="experience__role">{t(`experience.${key}.role`)}</h3>
                    <div className="experience__company">
                      {companyUrl ? (
                        <a href={companyUrl} target="_blank" rel="noreferrer" className="experience__company-link">{company}</a>
                      ) : (
                        <span>{company}</span>
                      )}
                      <span className="experience__separator">·</span>
                      <span className="experience__location">{location}</span>
                    </div>
                  </div>
                  <div className="experience__period-wrap">
                    <span className="experience__period">{period}</span>
                    {current && <span className="experience__badge">{t('experience.current')}</span>}
                  </div>
                </div>

                <ul className="experience__bullets">
                  {t(`experience.${key}.bullets`, { returnObjects: true }).map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>

                <div className="experience__tags">
                  {tags.map(tag => (
                    <span key={tag} className="experience__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
