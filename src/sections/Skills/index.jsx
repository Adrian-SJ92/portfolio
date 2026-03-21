import { useTranslation } from 'react-i18next';
import './Skills.css';

const skillsData = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 88 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 85 },
  ],
  backend: [
    { name: 'PHP', level: 85 },
    { name: 'Laravel', level: 82 },
    { name: 'Filament', level: 78 },
    { name: 'Node.js', level: 75 },
    { name: 'REST APIs', level: 88 },
    { name: 'n8n', level: 72 },
  ],
  database: [
    { name: 'MySQL', level: 82 },
    { name: 'MongoDB', level: 75 },
    { name: 'SQLite', level: 78 },
  ],
  tools: [
    { name: 'Git', level: 95 },
    { name: 'GitLab', level: 90 },
    { name: 'VS Code', level: 95 },
    { name: 'npm', level: 85 },
  ],
};

function SkillBar({ name, level }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{ '--level': `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const categories = ['frontend', 'backend', 'database', 'tools'];

  return (
    <section id="skills" className="skills" data-reveal>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">{t('skills.subtitle')}</p>
          <h2 className="section-title">{t('skills.title')}</h2>
        </div>

        <div className="skills__grid">
          {categories.map(cat => (
            <div key={cat} className="glass-card skills__category">
              <h3 className="skills__category-title">
                <span className="skills__category-icon">
                  {cat === 'frontend' && '◈'}
                  {cat === 'backend' && '⬡'}
                  {cat === 'database' && '◉'}
                  {cat === 'tools' && '⌘'}
                </span>
                {t(`skills.${cat}`)}
              </h3>
              <div className="skills__bars">
                {skillsData[cat].map(skill => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
