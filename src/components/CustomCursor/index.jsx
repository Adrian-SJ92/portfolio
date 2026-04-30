import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const isHover = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const onOver = (e) => {
      const over = !!e.target.closest('a, button');
      if (over !== isHover.current) {
        isHover.current = over;
        ring.classList.toggle('cursor-ring--hover', over);
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.1);
      const offset = isHover.current ? 26 : 18;
      ring.style.transform = `translate(${pos.current.x - offset}px, ${pos.current.y - offset}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
