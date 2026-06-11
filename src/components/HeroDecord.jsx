import { useEffect, useRef } from "react";
import {
  IconBook,
  IconCalendar,
  IconStar,
  IconUsers,
  IconSchool,
  IconChecklist,
  IconNotebook,
  IconChartBar,
  IconClock,
  IconUserCheck,
  IconFileText,
  IconBrain
} from "@tabler/icons-react";

const HeroDecor = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const icons = container.querySelectorAll(".hero-icon");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      mouseX = (e.clientX / innerWidth - 0.5);
      mouseY = (e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;

    const animate = () => {
      icons.forEach((icon, index) => {
        const depth = icon.dataset.depth || 1;

        const x = mouseX * depth * 10;
        const y = mouseY * depth * 10;

        const float = Math.sin(Date.now() / 1000 + index) * 4;

        icon.style.transform = `translate(${x}px, ${y + float}px)`;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="hero-decor" ref={containerRef}>

      {/* IZQUIERDA */}
      <div className="hero-icon icon-1 small" data-depth="1"><IconBook size={26} /></div>
      <div className="hero-icon icon-2 medium" data-depth="2"><IconStar size={32} /></div>
      <div className="hero-icon icon-3 big" data-depth="3"><IconSchool size={40} /></div>
      <div className="hero-icon icon-7 small" data-depth="1"><IconNotebook size={26} /></div>
      <div className="hero-icon icon-8 medium" data-depth="2"><IconChartBar size={30} /></div>
      <div className="hero-icon icon-9 small" data-depth="1"><IconClock size={24} /></div>

      {/* DERECHA */}
      <div className="hero-icon icon-4 medium" data-depth="2"><IconCalendar size={32} /></div>
      <div className="hero-icon icon-5 big" data-depth="3"><IconUsers size={38} /></div>
      <div className="hero-icon icon-6 small" data-depth="1"><IconChecklist size={26} /></div>
      <div className="hero-icon icon-10 medium" data-depth="2"><IconUserCheck size={30} /></div>
      <div className="hero-icon icon-11 small" data-depth="1"><IconFileText size={24} /></div>
      <div className="hero-icon icon-12 medium" data-depth="2"><IconBrain size={30} /></div>

    </div>
  );
};

export default HeroDecor;