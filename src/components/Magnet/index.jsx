import { useRef, useEffect } from 'react';

export default function Magnet({ children, strength = 0.38, radius = 90 }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = wrap.firstElementChild;
    if (!inner) return;

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        inner.style.transition = 'transform 0.12s ease';
      } else if (inner.style.transform) {
        inner.style.transform = '';
        inner.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [strength, radius]);

  return (
    <div ref={wrapRef} style={{ display: 'inline-flex' }}>
      {children}
    </div>
  );
}
