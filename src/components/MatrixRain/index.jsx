import { useEffect, useRef } from 'react';

const CHARS = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF@#$%&';
const FS = 14; // font size + column width

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let drops = [];
    let speeds = [];

    const init = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / FS);
      drops  = Array.from({ length: cols }, () => Math.floor(Math.random() * -(canvas.height / FS)));
      speeds = Array.from({ length: cols }, () => Math.floor(Math.random() * 3) + 1);
    };

    let frame = 0;
    const draw = () => {
      frame = (frame + 1) % 600;

      // Semi-transparent overlay = fading trail effect
      ctx.fillStyle = 'rgba(5,10,14,0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FS}px "JetBrains Mono", monospace`;

      const cols = Math.floor(canvas.width / FS);
      for (let i = 0; i < cols; i++) {
        if (frame % speeds[i] !== 0) continue;

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FS;
        const y = drops[i] * FS;

        // Head is bright, trail fades naturally via overlay
        ctx.fillStyle = '#b0ffb0';
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = Math.floor(Math.random() * 3) + 1;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
