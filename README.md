# Portfolio — Adrián Sánchez

Portfolio personal desarrollado con React + Vite. Diseño minimalista, moderno y futurista con soporte multiidioma (español / inglés).

## Stack

- **React 19** + **Vite**
- **react-i18next** — internacionalización (ES / EN)
- **@emailjs/browser** — formulario de contacto funcional
- **CSS plano** — variables CSS, glassmorphism, animaciones

## Inicio rápido

```bash
npm install
cp .env.example .env   # Rellena las variables de entorno
npm run dev            # http://localhost:5173
```

```bash
npm run build     # Build de producción → dist/
npm run preview   # Preview del build
```

## Variables de entorno

Crea un archivo `.env` en la raíz con los siguientes valores:

```env
# EmailJS (emailjs.com)
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

# Contacto personal
VITE_EMAIL=
VITE_PHONE=
VITE_PHONE_DISPLAY=

# Redes sociales
VITE_GITHUB=
VITE_LINKEDIN=
VITE_INSTAGRAM=

# CV
VITE_CV_URL=/cv-adrian.pdf
```

## Secciones

| Sección | Descripción |
|---|---|
| Hero | Presentación, foto, CTAs, redes sociales y descarga de CV |
| Sobre mí | Bio, estadísticas animadas, typewriter y tecnologías |
| Experiencia | Timeline con historial laboral |
| Habilidades | Stack técnico con barras de progreso |
| Proyectos | Cards con preview de código y links a GitHub |
| Contacto | Formulario real (EmailJS) + info de contacto |

## Multiidioma

El idioma por defecto es español. El botón en la navbar alterna entre ES/EN y persiste la elección en `localStorage`.

```
src/locales/
├── es/translation.json
└── en/translation.json
```

## Estructura

```
src/
├── assets/           Imagen de perfil (avatar.jpg), CV en public/
├── components/       Navbar, Footer, CustomCursor, ScrollToTop
│   └── [Componente]/
│       ├── index.jsx
│       └── Componente.css
├── config/           emailjs.js, personal.js (leen de .env)
├── hooks/            useScrollReveal.js
├── locales/          Traducciones ES y EN
├── sections/         Hero, About, Experience, Skills, Projects, Contact
│   └── [Seccion]/
│       ├── index.jsx
│       └── Seccion.css
├── styles/           globals.css (tokens de diseño globales)
├── App.jsx
├── i18n.js
└── main.jsx
```

## Personalización

Todos los datos de contacto y redes sociales se configuran en `.env`. El contenido (proyectos, experiencia, bio) se edita directamente en cada sección:

- **Bio y estadísticas** → `src/sections/About/index.jsx`
- **Experiencia laboral** → `src/sections/Experience/index.jsx`
- **Proyectos** → `src/sections/Projects/index.jsx` + `src/locales/*/translation.json`
- **Habilidades** → `src/sections/Skills/index.jsx`

## Diseño

```css
--accent:  #00d4ff   /* Cyan neón principal */
--accent2: #7c3aed   /* Violeta secundario  */
--bg:      #050a0e   /* Fondo oscuro        */
```
