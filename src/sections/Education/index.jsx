import { useTranslation } from 'react-i18next';
import './Education.css';

const educations = [
  {
    key: 'bootcamp',
    institution: 'Socratech School',
    institutionUrl: null,
    location: 'Online',
    period: '2024 – 2025',
    tags: ['React', 'Node.js', 'JavaScript', 'MySQL', 'MongoDB', 'REST APIs', 'Git'],
  },
  {
    key: 'fp',
    institution: 'Centro de FP',
    institutionUrl: null,
    location: 'España',
    period: '2008 – 2010',
    tags: [],
  },
  {
    key: 'eso',
    institution: 'Instituto',
    institutionUrl: null,
    location: 'España',
    period: '2004 – 2008',
    tags: [],
  },
];

export default function Education() {
  const { t } = useTranslation();

  return (
    <section id="education" className="education" data-reveal>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">{t('education.subtitle')}</p>
          <h2 className="section-title">{t('education.title')}</h2>
        </div>

        <div className="education__timeline">
          {educations.map(({ key, institution, institutionUrl, location, period, tags }, i) => {
            const bullets = t(`education.${key}.bullets`, { returnObjects: true });
            const hasBullets = Array.isArray(bullets) && bullets.length > 0;

            return (
              <div key={key} className="education__item">
                <div className="education__line">
                  <div className="education__dot" />
                  {i < educations.length - 1 && <div className="education__connector" />}
                </div>

                <div className="glass-card education__card">
                  <div className="education__card-header">
                    <div>
                      <h3 className="education__degree">{t(`education.${key}.degree`)}</h3>
                      <div className="education__institution">
                        {institutionUrl ? (
                          <a href={institutionUrl} target="_blank" rel="noreferrer" className="education__institution-link">{institution}</a>
                        ) : (
                          <span>{institution}</span>
                        )}
                        <span className="education__separator">·</span>
                        <span className="education__location">{location}</span>
                      </div>
                    </div>
                    <div className="education__period-wrap">
                      <span className="education__period">{period}</span>
                    </div>
                  </div>

                  {hasBullets && (
                    <ul className="education__bullets">
                      {bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {tags.length > 0 && (
                    <div className="education__tags">
                      {tags.map(tag => (
                        <span key={tag} className="education__tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
