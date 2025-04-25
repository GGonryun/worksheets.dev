import { useRef, useEffect } from 'react';

type Meteor = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  length: number;
  opacity: number;
};

export const MeteorShowerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteors = useRef<Meteor[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame: number;

    const spawnMeteor = () => {
      const fromTop = Math.random() < 0.5;

      const x = fromTop ? Math.random() * canvas.width : canvas.width + 50;
      const y = fromTop ? -50 : Math.random() * canvas.height;
      const angle = fromTop
        ? Math.PI * (0.75 + Math.random() * 0.25) // ~135°–180°
        : Math.PI * (1.25 + Math.random() * 0.25); // ~225°–270°

      const speed = 20 + Math.random() * 20; // ⚡ increased speed
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      meteors.current.push({
        x,
        y,
        dx,
        dy,
        speed,
        length: 60 + speed * 15, // 💡 longer with speed
        opacity: 0.4 + Math.random() * 0.4,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      meteors.current.forEach((m, index) => {
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - (m.length * m.dx) / m.speed,
          m.y - (m.length * m.dy) / m.speed
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${m.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        m.x += m.dx;
        m.y += m.dy;

        // 🚀 Delay removal – wait until it’s well offscreen
        if (
          m.x < -200 ||
          m.y > canvas.height + 200 ||
          m.y < -200 ||
          m.x > canvas.width + 200
        ) {
          meteors.current.splice(index, 1);
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const meteorTimer = setInterval(() => {
      spawnMeteor();
    }, 500 + Math.random() * 3000); // ⏳ happens less frequently

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(meteorTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[51] pointer-events-none"
    />
  );
};
