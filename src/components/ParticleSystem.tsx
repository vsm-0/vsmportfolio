import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  const createParticle = useCallback((x: number, y: number, isMouseTrail = false): Particle => {
    return {
      x,
      y,
      size: isMouseTrail ? Math.random() * 3 + 1 : Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * (isMouseTrail ? 2 : 0.5),
      speedY: (Math.random() - 0.5) * (isMouseTrail ? 2 : 0.5) - (isMouseTrail ? 0 : 0.3),
      opacity: isMouseTrail ? 0.8 : Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: isMouseTrail ? 60 : Math.random() * 200 + 100,
    };
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor((width * height) / 20000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(
        Math.random() * width,
        Math.random() * height
      ));
    }
    
    particlesRef.current = particles;
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add mouse trail particles
      const distance = Math.sqrt((e.clientX - prevX) ** 2 + (e.clientY - prevY) ** 2);
      if (distance > 5 && particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life++;
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Fade based on life
        const lifeRatio = particle.life / particle.maxLife;
        const currentOpacity = particle.opacity * (1 - lifeRatio);

        // Draw particle with gold color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `hsla(43, 66%, 52%, ${currentOpacity})`);
        gradient.addColorStop(0.5, `hsla(43, 66%, 52%, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(43, 66%, 52%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Respawn if off-screen or life ended
        if (particle.life >= particle.maxLife) {
          if (particle.maxLife > 100) {
            // Reset ambient particles
            particle.x = Math.random() * canvas.width;
            particle.y = canvas.height + 10;
            particle.life = 0;
            return true;
          }
          return false; // Remove mouse trail particles
        }

        // Wrap around screen for ambient particles
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initParticles, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleSystem;
