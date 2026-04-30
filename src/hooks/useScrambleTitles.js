import { useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

export default function useScrambleTitles() {
  useEffect(() => {
    const elements = document.querySelectorAll('.section-title');
    const cleanups = [];

    elements.forEach((el) => {
      const original = el.textContent;
      let rafId;

      const scramble = () => {
        let frame = 0;
        const totalFrames = 32;

        const tick = () => {
          const progress = frame / totalFrames;
          const resolved = Math.floor(progress * original.length);

          let result = '';
          for (let i = 0; i < original.length; i++) {
            if (original[i] === ' ') result += ' ';
            else if (i < resolved) result += original[i];
            else result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }

          el.textContent = result;
          frame++;

          if (frame <= totalFrames) {
            rafId = requestAnimationFrame(tick);
          } else {
            el.textContent = original;
          }
        };

        // Small delay so the section fade-in starts before scramble
        setTimeout(() => { rafId = requestAnimationFrame(tick); }, 350);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            scramble();
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
      cleanups.push(() => { observer.disconnect(); cancelAnimationFrame(rafId); });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
