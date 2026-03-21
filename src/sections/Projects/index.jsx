import { useTranslation } from 'react-i18next';
import './Projects.css';

const projects = [
  {
    key: 'project1',
    tags: ['React', 'Node.js', 'MySQL', 'REST API'],
    github: 'https://github.com/Adrian-SJ92/Soti-Barber-Studio',
    demo: null,
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))',
  },
  {
    key: 'project2',
    tags: ['Node.js', 'MySQL', 'EJS', 'Express'],
    github: 'https://github.com/Adrian-SJ92/MotoStyleHub',
    demo: null,
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,212,255,0.1))',
  },
  {
    key: 'project3',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/Adrian-SJ92/sync-user-service',
    demo: null,
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.12))',
  },
];

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="projects" data-reveal>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">{t('projects.subtitle')}</p>
          <h2 className="section-title">{t('projects.title')}</h2>
        </div>

        <div className="projects__grid">
          {projects.map(({ key, tags, github, demo, gradient }, i) => (
            <article key={key} className="glass-card project-card" style={{ '--i': i }}>
              <div className="project-card__header" style={{ background: gradient }}>
                <div className="project-card__header-bar">
                  <div className="project-card__dots">
                    <span /><span /><span />
                  </div>
                  <div className="project-card__num">0{i + 1}</div>
                </div>
                <div className="project-card__preview">
                  {[70, 45, 85, 55, 65].map((w, j) => (
                    <div key={j} className={`project-card__code-line${j === 0 || j === 3 ? ' project-card__code-line--accent' : ''}`} style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{t(`projects.${key}.title`)}</h3>
                <p className="project-card__desc">{t(`projects.${key}.description`)}</p>

                <div className="project-card__tags">
                  {tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-card__footer">
                <a href={github} className="btn-outline project-card__btn" target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  {t('projects.viewCode')}
                </a>
                {demo && (
                  <a href={demo} className="btn-primary project-card__btn" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    {t('projects.viewDemo')}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
