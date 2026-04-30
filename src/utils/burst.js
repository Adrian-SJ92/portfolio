const DEFAULT_COLORS = ['0,212,255', '124,58,237', '34,197,94', '0,212,255', '255,255,255'];

export function burst(x, y, count = 72, colors = null) {
  const COLORS = colors || DEFAULT_COLORS;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99998;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const speed = Math.random() * 8 + 2;
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 3,
      w: Math.random() * 7 + 2,
      h: Math.random() * 4 + 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
      isCircle: Math.random() > 0.45,
    };
  });

  let rafId;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      p.vy += 0.2;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.alpha -= 0.015;
      p.rot += p.rotSpeed;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = `rgb(${p.color})`;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.isCircle) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
    }
    if (alive) rafId = requestAnimationFrame(draw);
    else canvas.remove();
  };
  rafId = requestAnimationFrame(draw);
}
