'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function WorkshopSlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const matrixIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const totalSlides = 28;

  useEffect(() => {
    setMounted(true);
    
    // Aspetta che il DOM sia pronto prima di inizializzare
    const timer = setTimeout(() => {
      if (bgCanvasRef.current && matrixCanvasRef.current) {
        // Inizializza dimensioni canvas
        bgCanvasRef.current.width = window.innerWidth;
        bgCanvasRef.current.height = window.innerHeight;
        matrixCanvasRef.current.width = window.innerWidth;
        matrixCanvasRef.current.height = window.innerHeight;
        
        // Inizializza particelle
        initParticles();
        
        // AVVIA L'ANIMAZIONE - questo era mancante!
        animateParticles();
      }
      updateSlide(0);
    }, 200);

    return () => {
      clearTimeout(timer);
      if (matrixIntervalRef.current) {
        clearInterval(matrixIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      updateSlide(currentSlide);
    }
  }, [currentSlide, mounted]);

  const initParticles = () => {
    if (!bgCanvasRef.current) return;
    const canvas = bgCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const particleCount = 100;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        color: '#00f3ff',
      });
    }
  };

  const animateParticles = () => {
    if (!bgCanvasRef.current) {
      // Se il canvas non è ancora pronto, riprova al prossimo frame
      animationFrameRef.current = requestAnimationFrame(animateParticles);
      return;
    }
    const canvas = bgCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(animateParticles);
      return;
    }
    
    // Se non ci sono particelle, inizializza
    if (particlesRef.current.length === 0) {
      initParticles();
    }

    const width = canvas.width;
    const height = canvas.height;
    const connectionDistance = 150;

    ctx.clearRect(0, 0, width, height);

    particlesRef.current.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const other = particlesRef.current[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / connectionDistance})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });

    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  const startMatrix = () => {
    if (!matrixCanvasRef.current || matrixIntervalRef.current) return;
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const columns = width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    matrixIntervalRef.current = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);
  };

  const stopMatrix = () => {
    if (matrixIntervalRef.current) {
      clearInterval(matrixIntervalRef.current);
      matrixIntervalRef.current = null;
    }
  };

  const updateSlide = (index: number) => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next');
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('next');
      }
    });

    const progress = ((index + 1) / totalSlides) * 100;
    const progressBar = document.getElementById('progress-bar');
    const slideNumber = document.getElementById('slide-number');
    
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (slideNumber) slideNumber.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;

    // Matrix Rain Toggle
    if (index === 7) { // slide-8 (0-indexed)
      if (matrixCanvasRef.current) matrixCanvasRef.current.style.display = 'block';
      if (bgCanvasRef.current) bgCanvasRef.current.style.display = 'none';
      startMatrix();
    } else {
      if (matrixCanvasRef.current) matrixCanvasRef.current.style.display = 'none';
      if (bgCanvasRef.current) bgCanvasRef.current.style.display = 'block';
      stopMatrix();
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.clientX > window.innerWidth / 2) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [currentSlide]);

  useEffect(() => {
    const handleResize = () => {
      initParticles();
      if (bgCanvasRef.current) {
        bgCanvasRef.current.width = window.innerWidth;
        bgCanvasRef.current.height = window.innerHeight;
      }
      if (matrixCanvasRef.current) {
        matrixCanvasRef.current.width = window.innerWidth;
        matrixCanvasRef.current.height = window.innerHeight;
      }
    };

    // Holographic Tilt Effect
    const handleTilt = (e: MouseEvent) => {
      const panels = document.querySelectorAll('.glass-panel');
      panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - centerY) / centerY) * -2;
          const rotateY = ((x - centerX) / centerX) * 2;
          (panel as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
          (panel as HTMLElement).style.transition = 'transform 0.1s ease-out';
          (panel as HTMLElement).style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 243, 255, 0.2)`;
        } else {
          (panel as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
          (panel as HTMLElement).style.transition = 'transform 0.5s ease';
          (panel as HTMLElement).style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.1)';
        }
      });
    };

    const resetTilt = () => {
      const panels = document.querySelectorAll('.glass-panel');
      panels.forEach((panel) => {
        (panel as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        (panel as HTMLElement).style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.1)';
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleTilt);
    window.addEventListener('mouseleave', resetTilt);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleTilt);
      window.removeEventListener('mouseleave', resetTilt);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div id="slide-root" style={{ width: '100vw', height: '100vh' }}>
      <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Audiowide&family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />
      <style jsx global>{`
        :root {
          --neon-green: #00ff41;
          --neon-blue: #00f3ff;
          --neon-purple: #bc13fe;
          --neon-red: #ff003c;
          --dark-bg: #0a0a0a;
          --panel-bg: rgba(20, 25, 35, 0.7);
          --border-color: rgba(0, 243, 255, 0.5);
          --text-main: #ffffff;
          --font-title: 'Orbitron', sans-serif;
          --font-body: 'Rajdhani', sans-serif;
          --font-code: 'Share Tech Mono', monospace;
        }

        body {
          background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          user-select: none;
        }

        #bg-canvas {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 0 !important;
          opacity: 0.3 !important;
          display: block !important;
          visibility: visible !important;
          pointer-events: none !important;
        }

        #matrix-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          display: none;
        }

        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2));
          background-size: 100% 4px;
          z-index: 999;
          pointer-events: none;
          opacity: 0.3;
        }

        .vignette {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, transparent 50%, black 150%);
          z-index: 998;
          pointer-events: none;
        }

        #slides-container {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 10;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 4rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform: scale(1.1) translateZ(-50px);
          filter: blur(10px);
        }

        .slide.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1) translateZ(0);
          filter: blur(0);
          z-index: 20;
        }

        .slide.prev {
          transform: translateX(-100%) scale(0.8) rotateY(20deg);
          opacity: 0;
          filter: blur(5px);
        }

        .slide.next {
          transform: translateX(100%) scale(0.8) rotateY(-20deg);
          opacity: 0;
          filter: blur(5px);
        }

        h1 {
          font-family: var(--font-title);
          font-size: 5rem;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 20px var(--neon-blue);
          margin-bottom: 1rem;
          letter-spacing: 4px;
          text-align: center;
        }

        h2 {
          font-family: var(--font-title);
          font-size: 3.5rem;
          color: var(--neon-green);
          text-transform: uppercase;
          margin-bottom: 2rem;
          text-shadow: 0 0 10px var(--neon-green);
          border-bottom: 2px solid var(--neon-green);
          padding-bottom: 0.5rem;
          display: inline-block;
        }

        h3 {
          font-family: 'Audiowide', cursive;
          font-size: 2rem;
          color: var(--neon-purple);
          margin-bottom: 1.5rem;
        }

        p, li {
          font-size: 1.8rem;
          line-height: 1.6;
          max-width: 1200px;
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          text-align: left;
        }

        li {
          padding-left: 2rem;
          position: relative;
        }

        li::before {
          content: '>';
          position: absolute;
          left: 0;
          color: var(--neon-blue);
          font-family: var(--font-code);
        }

        .highlight {
          color: var(--neon-blue);
          font-weight: 700;
        }

        .highlight-green {
          color: var(--neon-green);
          font-weight: 700;
        }

        .highlight-blue {
          color: var(--neon-blue);
          font-weight: 700;
        }

        .highlight-purple {
          color: var(--neon-purple);
          font-weight: 700;
        }

        .highlight-red {
          color: var(--neon-red);
          font-weight: 700;
        }

        .glass-panel {
          background: var(--panel-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
          backdrop-filter: blur(10px);
          margin: 1rem;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
          max-width: 1400px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          width: 100%;
          max-width: 1400px;
        }

        .progress-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          height: 4px;
          background: var(--neon-blue);
          width: 0%;
          z-index: 1000;
          transition: width 0.3s;
          box-shadow: 0 0 10px var(--neon-blue);
        }

        .slide-number {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-family: var(--font-code);
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.5);
          z-index: 1000;
        }

        @keyframes glitch-anim {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .glitch-effect {
          animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          color: var(--neon-red);
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }

        @keyframes pulse-green {
          0% { transform: scale(1); text-shadow: 0 0 10px var(--neon-green); }
          50% { transform: scale(1.1); text-shadow: 0 0 20px var(--neon-green), 0 0 40px var(--neon-green); }
          100% { transform: scale(1); text-shadow: 0 0 10px var(--neon-green); }
        }

        @keyframes pulse-blue {
          0% { transform: scale(1); text-shadow: 0 0 10px var(--neon-blue); }
          50% { transform: scale(1.1); text-shadow: 0 0 20px var(--neon-blue), 0 0 40px var(--neon-blue); }
          100% { transform: scale(1); text-shadow: 0 0 10px var(--neon-blue); }
        }

        @keyframes pulse-purple {
          0% { transform: scale(1); text-shadow: 0 0 10px var(--neon-purple); }
          50% { transform: scale(1.1); text-shadow: 0 0 20px var(--neon-purple), 0 0 40px var(--neon-purple); }
          100% { transform: scale(1); text-shadow: 0 0 10px var(--neon-purple); }
        }

        .price-highlight-green {
          font-size: 2.5rem !important;
          font-weight: 900 !important;
          color: #fff;
          animation: pulse-green 2s infinite;
          margin-top: 1.5rem !important;
        }

        .price-highlight-blue {
          font-size: 2.5rem !important;
          font-weight: 900 !important;
          color: #fff;
          animation: pulse-blue 2s infinite;
          margin-top: 1.5rem !important;
        }

        .main-title {
          font-family: var(--font-title);
          font-size: 5rem;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 20px var(--neon-blue);
          margin-bottom: 1rem;
          letter-spacing: 4px;
          text-align: center;
        }

        .subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}</style>

      <div id="slide-root" className="fixed inset-0 bg-black text-white overflow-hidden" style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, zIndex: 1 }}>
        <canvas ref={matrixCanvasRef} id="matrix-canvas" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />
        <canvas ref={bgCanvasRef} id="bg-canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3, display: 'block', visibility: 'visible', pointerEvents: 'none' }} />
        <div className="scanline" />
        <div className="vignette" />

        <div className="progress-bar" id="progress-bar" />
        <div className="slide-number" id="slide-number">01 / 28</div>

        <div id="slides-container">
          {/* SLIDE 1: INTRO */}
          <div className="slide active" id="slide-1">
            <h3 className="fade-in-up">OSM VENEZIA PRESENTA</h3>
            <h1 className="fade-in-up delay-1" style={{ fontSize: '6rem' }}>AI EXPERIENCE</h1>
            <h2 className="fade-in-up delay-2" style={{ color: '#fff', border: 'none', fontSize: '2.5rem' }}>
              WORKSHOP 12 DICEMBRE
            </h2>
            <div className="glass-panel fade-in-up delay-3" style={{ marginTop: '3rem' }}>
              <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                <span className="highlight-green">PIÙ CLIENTI.</span>{' '}
                <span className="highlight-blue">PIÙ ORGANIZZAZIONE.</span>{' '}
                <span className="highlight-purple">GRAZIE ALL&apos;AI.</span>
              </p>
            </div>
            <p className="fade-in-up delay-4" style={{ marginTop: '2rem', fontFamily: 'var(--font-code)', opacity: 0.7 }}>
              Inizia l&apos;avventura!
            </p>
          </div>

          {/* SLIDE 2: HEYGEN VIDEO */}
          <div className="slide" id="slide-2">
            <h2>BENVENUTI NEL FUTURO</h2>
            <div className="glass-panel" style={{ width: '80%', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid var(--neon-blue)', padding: 0, overflow: 'hidden' }}>
              <video src="/videos/INTRO_AI_EXPERIENCE.mp4" controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ marginTop: '2rem' }}>
              &quot;seguici in questo percorso e tornerai in azienda con la testa piena di idee applicabili da domani!&quot;
            </p>
          </div>

          {/* SLIDE 3: OBIETTIVI */}
          <div className="slide" id="slide-3">
            <h2>OBIETTIVI DI OGGI</h2>
            <div className="grid-3">
              <div className="glass-panel fade-in-up delay-1">
                <i className="fa-solid fa-eye" style={{ fontSize: '3rem', color: 'var(--neon-green)', marginBottom: '1rem' }} />
                <h3>VISIONE</h3>
                <p>Capire chiaramente dove sta andando il mondo e perché non puoi restare fermo.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <i className="fa-solid fa-lightbulb" style={{ fontSize: '3rem', color: 'var(--neon-blue)', marginBottom: '1rem' }} />
                <h3>IDEE PRATICHE</h3>
                <p>Acquisisci 2-3 idee subito applicabili nella tua azienda da domani mattina.</p>
              </div>
              <div className="glass-panel fade-in-up delay-3">
                <i className="fa-solid fa-rocket" style={{ fontSize: '3rem', color: 'var(--neon-purple)', marginBottom: '1rem' }} />
                <h3>CONSAPEVOLEZZA</h3>
                <p>AI + ORGANIZZAZIONE = <br />Più Tempo, Più Clienti, Più Margini.</p>
              </div>
            </div>
          </div>

          {/* SLIDE 3b: CROSSING THE CHASM */}
          <div className="slide" id="slide-3b">
            <h2>L&apos;ABISSO DELL&apos;INNOVAZIONE</h2>
            <div className="glass-panel fade-in-up delay-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '95%', maxWidth: '1200px' }}>
              <h3 style={{ color: 'var(--neon-purple)', marginBottom: '2rem', fontSize: '2.5rem' }}>SUPERARE L&apos;ABISSO</h3>
              <div style={{ position: 'relative', width: '100%', height: '450px', marginBottom: '2rem' }}>
                <svg viewBox="0 0 1000 450" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(0, 243, 255, 0.2)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(0, 243, 255, 0.05)', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M 50,420 C 80,400 100,380 120,350 C 140,320 160,280 180,240 C 200,200 220,160 240,120 C 260,80 280,50 300,35 C 320,25 340,20 360,18 C 380,20 400,25 420,35 C 440,50 460,80 480,120 C 500,160 520,200 540,240 C 560,280 580,320 600,350 C 620,380 640,400 670,420 C 700,430 750,435 800,435 C 850,435 900,430 950,420 L 950,450 L 50,450 Z" fill="url(#bellGradient)" stroke="var(--neon-blue)" strokeWidth="2" opacity="0.4" />
                  <line x1="120" y1="450" x2="120" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="240" y1="450" x2="240" y2="50" stroke="var(--neon-red)" strokeWidth="3" strokeDasharray="10,5" opacity="0.9" />
                  <line x1="300" y1="450" x2="300" y2="50" stroke="var(--neon-red)" strokeWidth="3" strokeDasharray="10,5" opacity="0.9" />
                  <line x1="500" y1="450" x2="500" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="670" y1="450" x2="670" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <rect x="240" y="50" width="60" height="400" fill="var(--neon-red)" opacity="0.15" />
                  <text x="270" y="280" fill="var(--neon-red)" textAnchor="middle" fontSize="26" fontWeight="bold" transform="rotate(-90 270,280)">L&apos;ABISSO</text>
                  
                  {/* INNOVATORI (2.5%) - Curva: x=50 y=420, x=60 y≈385, x=120 y=350 */}
                  <rect x="25" y="370" width="70" height="30" fill="var(--neon-purple)" opacity="0.8" rx="3" />
                  <text x="60" y="390" fill="#fff" textAnchor="middle" fontSize="13" fontWeight="bold" dominantBaseline="middle">INNOVATORI</text>
                  <text x="60" y="355" fill="var(--neon-purple)" textAnchor="middle" fontSize="16" fontWeight="bold">2.5%</text>
                  
                  {/* ADOTTATORI PRECOCI (13.5%) - Curva: x=120 y=350, x=180 y=240, x=240 y=120 */}
                  <rect x="120" y="215" width="120" height="50" fill="var(--neon-green)" opacity="0.8" rx="3" />
                  <text x="180" y="238" fill="#fff" textAnchor="middle" fontSize="13" fontWeight="bold" dominantBaseline="middle">ADOTTATORI</text>
                  <text x="180" y="255" fill="#fff" textAnchor="middle" fontSize="13" fontWeight="bold" dominantBaseline="middle">PRECOCI</text>
                  <text x="180" y="200" fill="var(--neon-green)" textAnchor="middle" fontSize="16" fontWeight="bold">13.5%</text>
                  
                  {/* MAGGIORANZA PRECOCE (34%) - Curva: x=300 y=35, x=400 y=25 (vicino picco y=18), x=500 y=160 */}
                  <rect x="300" y="40" width="200" height="105" fill="var(--neon-blue)" opacity="0.8" rx="3" />
                  <text x="400" y="68" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold" dominantBaseline="middle">MAGGIORANZA</text>
                  <text x="400" y="85" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold" dominantBaseline="middle">PRECOCE</text>
                  <text x="400" y="103" fill="#fff" textAnchor="middle" fontSize="11" dominantBaseline="middle">(Pragmatici)</text>
                  <text x="400" y="120" fill="#fff" textAnchor="middle" fontSize="11" dominantBaseline="middle">Aspettano soluzioni</text>
                  <text x="400" y="133" fill="#fff" textAnchor="middle" fontSize="11" dominantBaseline="middle">già provate</text>
                  <text x="400" y="25" fill="var(--neon-blue)" textAnchor="middle" fontSize="18" fontWeight="bold">34%</text>
                  
                  {/* MAGGIORANZA TARDIVA (34%) - Curva: x=500 y=160, x=585 y≈255, x=670 y=350 */}
                  <rect x="500" y="220" width="170" height="105" fill="rgba(0, 243, 255, 0.6)" opacity="0.8" rx="3" />
                  <text x="585" y="248" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold" dominantBaseline="middle">MAGGIORANZA</text>
                  <text x="585" y="265" fill="#fff" textAnchor="middle" fontSize="14" fontWeight="bold" dominantBaseline="middle">TARDIVA</text>
                  <text x="585" y="283" fill="#fff" textAnchor="middle" fontSize="11" dominantBaseline="middle">(Conservatori)</text>
                  <text x="585" y="300" fill="#fff" textAnchor="middle" fontSize="11" dominantBaseline="middle">Adottano quando</text>
                  <text x="585" y="313" fill="#fff" textAnchor="middle" fontSize="11" dominantBaseline="middle">diventa standard</text>
                  <text x="585" y="205" fill="var(--neon-blue)" textAnchor="middle" fontSize="18" fontWeight="bold">34%</text>
                  
                  {/* RITARDATARI (16%) - Curva: x=670 y=350, x=810 y≈385, x=950 y=420 */}
                  <rect x="760" y="360" width="100" height="50" fill="rgba(255, 255, 255, 0.6)" opacity="0.8" rx="3" />
                  <text x="810" y="383" fill="#000" textAnchor="middle" fontSize="13" fontWeight="bold" dominantBaseline="middle">RITARDATARI</text>
                  <text x="810" y="400" fill="#000" textAnchor="middle" fontSize="12" dominantBaseline="middle">(Scettici)</text>
                  <text x="810" y="345" fill="#fff" textAnchor="middle" fontSize="16" fontWeight="bold">16%</text>
                  <text x="500" y="445" fill="rgba(255,255,255,0.7)" textAnchor="middle" fontSize="14" fontWeight="bold">TEMPO →</text>
                  <circle cx="500" cy="18" r="6" fill="var(--neon-blue)" filter="url(#glow)" />
                  <text x="500" y="10" fill="var(--neon-blue)" textAnchor="middle" fontSize="11" fontWeight="bold">PICCO</text>
                </svg>
              </div>
              <p className="fade-in-up delay-3" style={{ marginTop: '1rem', fontSize: '2rem', textAlign: 'center' }}>
                &quot;L&apos;AI è il ponte per superare l&apos;abisso <span className="highlight-green">ORA</span>.&quot;
              </p>
            </div>
          </div>

          {/* SLIDE 4: IL MONDO CAMBIA */}
          <div className="slide" id="slide-4">
            <h2>IL MONDO STA CAMBIANDO</h2>
            <h3 style={{ color: '#fff', opacity: 0.8 }}>CHE TI PIACCIA O NO.</h3>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="glass-panel fade-in-up delay-1">
                <h3 className="highlight-red">OGGI</h3>
                <p>Le aziende iniziano a sperimentare.</p>
                <p>Chi parte ora costruisce <span className="highlight">METODO</span> e <span className="highlight">VANTAGGIO COMPETITIVO</span>.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2" style={{ borderColor: 'var(--neon-green)' }}>
                <h3 className="highlight-green">TRA 10 ANNI</h3>
                <p>Tutte le aziende saranno integrate con l&apos;AI.</p>
                <p>Chi aspetta, domani rincorrerà un mercato già saturo.</p>
              </div>
            </div>
            <p className="fade-in-up delay-3" style={{ marginTop: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>
              IL VANTAGGIO COMPETITIVO È <span className="highlight-blue glitch-effect">ADESSO</span>.
            </p>
          </div>

          {/* SLIDE 5: IL PROBLEMA DELLE PMI */}
          <div className="slide" id="slide-5">
            <h2>IL PROBLEMA DELLE PMI</h2>
            <div className="grid-2">
              <div className="glass-panel fade-in-up delay-1">
                <i className="fa-solid fa-network-wired" style={{ fontSize: '3rem', color: 'var(--neon-red)', marginBottom: '1rem' }} />
                <h3>DATI SCOLLEGATI</h3>
                <ul style={{ fontSize: '1.5rem' }}>
                  <li>Gestionale</li>
                  <li>Excel sparsi</li>
                  <li>WhatsApp</li>
                  <li>Email</li>
                  <li>Hard Disk locali</li>
                </ul>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <i className="fa-solid fa-user-slash" style={{ fontSize: '3rem', color: 'var(--neon-red)', marginBottom: '1rem' }} />
                <h3>BASSA COMPETENZA</h3>
                <p>Collaboratori bravissimi nel mestiere, ma insicuri con gli strumenti digitali.</p>
                <p style={{ marginTop: '1rem', color: 'var(--neon-red)' }}>RISCHIO:</p>
                <p>&quot;Mettiamo l&apos;AI!&quot; -&gt; Giocattolo inutile se non c&apos;è base.</p>
              </div>
            </div>
          </div>

          {/* SLIDE 6: LA TESI CENTRALE */}
          <div className="slide" id="slide-6">
            <h1 style={{ fontSize: '4rem' }}>LA FORMULA VINCENTE</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '80%' }}>
              <div className="glass-panel fade-in-up delay-1" style={{ borderLeft: '10px solid var(--neon-green)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <i className="fa-solid fa-check-circle" style={{ fontSize: '4rem', color: 'var(--neon-green)' }} />
                <div>
                  <h3 style={{ margin: 0, color: 'var(--neon-green)' }}>USA L&apos;AI PER DIGITALIZZARE</h3>
                  <p style={{ margin: 0 }}>L&apos;AI ti aiuta a mettere ordine, creare processi e strutturare i dati.</p>
                </div>
              </div>
              <div className="glass-panel fade-in-up delay-2" style={{ borderLeft: '10px solid var(--neon-red)', display: 'flex', alignItems: 'center', gap: '2rem', opacity: 0.6 }}>
                <i className="fa-solid fa-times-circle" style={{ fontSize: '4rem', color: 'var(--neon-red)' }} />
                <div>
                  <h3 style={{ margin: 0, color: 'var(--neon-red)' }}>AI SU AZIENDA NON DIGITALIZZATA</h3>
                  <p style={{ margin: 0 }}>Flop garantito. Solo &quot;effetti speciali&quot; senza impatto sui numeri.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 7: BASI DIGITALI */}
          <div className="slide" id="slide-7">
            <h2>PRIMA DELL&apos;AI: LE BASI</h2>
            <div className="grid-3">
              <div className="glass-panel fade-in-up delay-1">
                <i className="fa-brands fa-google-drive" style={{ fontSize: '3rem', color: 'var(--neon-blue)', marginBottom: '1rem' }} />
                <h3>CENTRALIZZAZIONE &amp; SICUREZZA</h3>
                <p>Un unico archivio aziendale accessibile ovunque.</p>
                <p>Permessi gestiti: ognuno vede solo ciò che serve.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <i className="fa-solid fa-table" style={{ fontSize: '3rem', color: 'var(--neon-green)', marginBottom: '1rem' }} />
                <h3>CRUSCOTTO DI COMANDO</h3>
                <p>Non semplici liste, ma strumenti decisionali.</p>
                <p>Dai dati grezzi agli indicatori di performance.</p>
              </div>
              <div className="glass-panel fade-in-up delay-3">
                <i className="fa-solid fa-chart-pie" style={{ fontSize: '3rem', color: 'var(--neon-purple)', marginBottom: '1rem' }} />
                <h3>ANALISI DATI</h3>
                <p>Tabelle Pivot.</p>
                <p>Capire i numeri prima di farli analizzare all&apos;AI.</p>
              </div>
            </div>
            <p className="fade-in-up delay-4" style={{ marginTop: '2rem', fontStyle: 'italic' }}>
              &quot;Se non hai cultura sul dato, non saprai cosa chiedere all&apos;AI.&quot;
            </p>
          </div>

          {/* SLIDE 7b: DATA BACKBONE */}
          <div className="slide" id="slide-7b">
            <h2>I DATI: LA SPINA DORSALE</h2>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="glass-panel fade-in-up delay-1" style={{ padding: 0, overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Dashboard Data" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <h3>PRIMA CAPISCO, POI AUTOMATIZZO</h3>
                <ul style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                  <li>Se non sai come calcoli il margine, l&apos;AI non lo indovinerà.</li>
                  <li>Se i tuoi file sono un casino, l&apos;AI farà un casino più veloce.</li>
                  <li><span className="highlight-green">GARBAGE IN, GARBAGE OUT.</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* SLIDE 8: MATRIX METAPHOR */}
          <div className="slide" id="slide-8">
            <h2>MATRIX DI COMPETENZE</h2>
            <div className="glass-panel" style={{ width: '80%', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid var(--neon-green)', padding: 0, overflow: 'hidden' }}>
              <video src="/videos/Video_slide_Matrix_Elicottero.mp4" controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ marginTop: '2rem' }}>
              &quot;So pilotare un elicottero? No. <span className="highlight-green">ADESSO SÌ.</span>&quot;
            </p>
          </div>

          {/* SLIDE 9: DOWNLOAD SKILL */}
          <div className="slide" id="slide-9">
            <h2>L&apos;AI GENERATIVA</h2>
            <div className="glass-panel fade-in-up delay-1">
              <h3>NON DEVI PIÙ &quot;IMPARARE&quot; TUTTO</h3>
              <p>Prima: Anni di studio per diventare mediocre in una skill.</p>
              <p>Oggi: <span className="highlight-blue">DOWNLOAD SKILL</span> istantaneo.</p>
              <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />
              <p>Hai bisogno di un Copywriter? <span className="highlight-purple">CARICA IL PROMPT.</span></p>
              <p>Hai bisogno di un Analista Dati? <span className="highlight-purple">CARICA IL FILE.</span></p>
              <div className="grid-3">
                <div className="glass-panel fade-in-up delay-1" style={{ borderColor: '#10a37f' }}>
                  <i className="fa-solid fa-robot" style={{ fontSize: '3rem', color: '#10a37f', marginBottom: '1rem' }} />
                  <h3 style={{ color: '#10a37f' }}>CHATGPT</h3>
                  <p>Il tuttofare.</p>
                  <p>Ottimo per iniziare.</p>
                </div>
                <div className="glass-panel fade-in-up delay-2" style={{ borderColor: '#d97757' }}>
                  <i className="fa-solid fa-brain" style={{ fontSize: '3rem', color: '#d97757', marginBottom: '1rem' }} />
                  <h3 style={{ color: '#d97757' }}>CLAUDE</h3>
                  <p>Il poeta e programmatore.</p>
                  <p>Testi lunghi e codice.</p>
                </div>
                <div className="glass-panel fade-in-up delay-3" style={{ borderColor: '#4285f4' }}>
                  <i className="fa-brands fa-google" style={{ fontSize: '3rem', color: '#4285f4', marginBottom: '1rem' }} />
                  <h3 style={{ color: '#4285f4' }}>GEMINI</h3>
                  <p>L&apos;integrato.</p>
                  <p>Perfetto per Google Workspace.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 10: PROMPT ENGINEERING */}
          <div className="slide" id="slide-10">
            <h2>COME PARLARE ALL&apos;AI</h2>
            <div className="glass-panel fade-in-up delay-1" style={{ width: '80%' }}>
              <h3 className="highlight-purple">IL BAMBINO GENIALE</h3>
              <p>Immagina di parlare a un bambino prodigio che non sa nulla del tuo contesto.</p>
              <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />
              <div className="grid-2">
                <div>
                  <h4 className="highlight-red" style={{ fontSize: '2rem' }}>NON DIRE:</h4>
                  <p>&quot;Scrivimi una mail per i clienti.&quot;</p>
                </div>
                <div>
                  <h4 className="highlight-green" style={{ fontSize: '2rem' }}>DI INVECE:</h4>
                  <p>&quot;Sei un consulente esperto. Scrivi una mail per clienti PMI del settore metalmeccanico per proporre un nuovo servizio di manutenzione...&quot;</p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 11: PERPLEXITY & COMET */}
          <div className="slide" id="slide-11">
            <h2 style={{ color: 'var(--neon-blue)', borderColor: 'var(--neon-blue)', textShadow: '0 0 10px var(--neon-blue)' }}>
              PERPLEXITY + COMET
            </h2>
            <h3 style={{ color: '#fff' }}>IL REGALO DEL WORKSHOP</h3>
            <div className="grid-2">
              <div className="glass-panel fade-in-up delay-1">
                <i className="fa-solid fa-search" style={{ fontSize: '3rem', color: 'var(--neon-blue)', marginBottom: '1rem' }} />
                <h3>RICERCA + AI</h3>
                <p>Non inventa, <span className="highlight-blue">TROVA</span>.</p>
                <p>Fonti reali, dati aggiornati.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <i className="fa-solid fa-bolt" style={{ fontSize: '3rem', color: 'var(--neon-blue)', marginBottom: '1rem' }} />
                <h3>COMET (DEMO LIVE)</h3>
                <p>Scandaglia il web per te.</p>
                <p>Esempio: &quot;Trova le migliori offerte luce e mettile in tabella.&quot;</p>
              </div>
            </div>
            <div className="glass-panel fade-in-up delay-3" style={{ marginTop: '2rem', borderColor: 'var(--neon-green)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p className="highlight-green" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>
                <i className="fa-solid fa-gift" /> ATTIVAZIONE PRO GRATIS PER 1 ANNO
              </p>
              <div style={{ background: 'white', padding: '10px', borderRadius: '10px', marginBottom: '1rem' }}>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.perplexity.ai/join/p/paypal-subscription" alt="QR Code Perplexity" style={{ width: '150px', height: '150px' }} />
              </div>
              <a href="https://www.perplexity.ai/join/p/paypal-subscription" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-blue)', fontSize: '1.5rem', textDecoration: 'underline' }}>
                perplexity.ai/join/p/paypal-subscription
              </a>
            </div>
          </div>

          {/* SLIDE 12: SUPER PROMPT DEMO */}
          <div className="slide" id="slide-12">
            <h2>DEMO LIVE: ANALISI AZIENDALE</h2>
            <div className="glass-panel" style={{ textAlign: 'center' }}>
              <i className="fa-solid fa-magic" style={{ fontSize: '5rem', color: 'var(--neon-purple)', marginBottom: '2rem' }} />
              <p style={{ fontSize: '2.5rem' }}>CERCO UN VOLONTARIO.</p>
              <p style={{ marginTop: '2rem' }}>
                Sito + P.IVA + Social = <span className="highlight-purple">STRATEGIA COMPLETA</span>
              </p>
            </div>
          </div>

          {/* SLIDE 13: AUTOMATION VS AGENTS */}
          <div className="slide" id="slide-13">
            <h2>AI vs AUTOMAZIONE vs AGENTI</h2>
            <div className="grid-3">
              <div className="glass-panel fade-in-up delay-1">
                <h3 style={{ color: '#fff' }}>AI PURA</h3>
                <p>Risponde, scrive, analizza.</p>
                <p style={{ opacity: 0.6 }}>(Il Cervello)</p>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <h3 style={{ color: '#fff' }}>AUTOMAZIONE</h3>
                <p>Sposta dati, invia email, esegue.</p>
                <p style={{ opacity: 0.6 }}>(Le Mani)</p>
              </div>
              <div className="glass-panel fade-in-up delay-3" style={{ borderColor: 'var(--neon-green)', boxShadow: '0 0 20px rgba(0,255,65,0.2)' }}>
                <h3 className="highlight-green">AGENTE AI</h3>
                <p>PENSA + ESEGUE.</p>
                <p>Il cervello che muove le mani.</p>
              </div>
            </div>
            <p className="fade-in-up delay-4" style={{ marginTop: '2rem' }}>
              &quot;Non code / Low code (n8n) è la chiave per le PMI. (Collega tutto senza scrivere codice)&quot;
            </p>
          </div>

          {/* SLIDE 14: CASE STUDY 1 - ENERGY */}
          <div className="slide" id="slide-14">
            <h2>CASO PRATICO: BOLLETTE</h2>
            <div className="grid-2">
              <div className="glass-panel fade-in-up delay-1">
                <h3 className="highlight-red">PRIMA</h3>
                <p>Persona dedicata a:</p>
                <ul>
                  <li>Ricevere PDF</li>
                  <li>Leggere dati</li>
                  <li>Compilare Excel</li>
                </ul>
              </div>
              <div className="glass-panel fade-in-up delay-2" style={{ borderColor: 'var(--neon-green)' }}>
                <h3 className="highlight-green">DOPO (AGENTE AI)</h3>
                <ol style={{ fontSize: '1.5rem', lineHeight: 1.6, marginLeft: '2rem' }}>
                  <li>Invio PDF su Telegram</li>
                  <li>AI legge e estrae i dati</li>
                  <li>Aggiorna Google Sheet</li>
                  <li>Risponde con recap</li>
                </ol>
              </div>
            </div>
          </div>

          {/* SLIDE 15: CASE STUDY 2 - AGENDA */}
          <div className="slide" id="slide-15">
            <h2>CASO PRATICO: AGENDA CARTACEA</h2>
            <div className="glass-panel fade-in-up delay-1" style={{ width: '85%', maxWidth: '1200px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '3rem', padding: '2rem 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-book-open" style={{ fontSize: '6rem', color: '#fff', marginBottom: '1.5rem' }} />
                  <p style={{ fontSize: '1.8rem', fontWeight: 600, color: '#fff' }}>FOTO ALL&apos;AGENDA</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '4rem', color: 'var(--neon-blue)', textShadow: '0 0 15px var(--neon-blue)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <h3 className="highlight-blue" style={{ fontSize: '2rem', marginBottom: '1rem' }}>GOOGLE CALENDAR</h3>
                  <h3 className="highlight-blue" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>AGGIORNATO</h3>
                  <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.9)' }}>
                    Nessun doppio lavoro.<br />
                    Nessuna dimenticanza.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 16: CASE STUDY 3 - RECORDING */}
          <div className="slide" id="slide-16">
            <h2>CASO PRATICO: QUESTO WORKSHOP</h2>
            <p className="fade-in-up delay-1" style={{ fontSize: '2rem', marginBottom: '2rem' }}>STIAMO REGISTRANDO TUTTO.</p>
            <div className="grid-3">
              <div className="glass-panel fade-in-up delay-2">
                <i className="fa-solid fa-microphone-lines" style={{ fontSize: '3rem', color: 'var(--neon-red)', marginBottom: '1rem' }} />
                <h3>INPUT</h3>
                <p>Registrazione Audio (Plaud).</p>
              </div>
              <div className="glass-panel fade-in-up delay-3">
                <i className="fa-solid fa-gears" style={{ fontSize: '3rem', color: 'var(--neon-blue)', marginBottom: '1rem' }} />
                <h3>PROCESSO</h3>
                <p>Trascrizione -&gt; Analisi -&gt; Sintesi.</p>
              </div>
              <div className="glass-panel fade-in-up delay-4">
                <i className="fa-solid fa-envelope-open-text" style={{ fontSize: '3rem', color: 'var(--neon-green)', marginBottom: '1rem' }} />
                <h3>OUTPUT (TRA POCO)</h3>
                <p>Report Completo.</p>
                <p>Mappa Mentale.</p>
                <p>To Do List.</p>
              </div>
            </div>
          </div>

          {/* SLIDE 17: CASE STUDY 4 - YOUTUBE */}
          <div className="slide" id="slide-17">
            <h2>CASO PRATICO: FORMAZIONE</h2>
            <div className="glass-panel fade-in-up delay-1" style={{ width: '70%' }}>
              <h3 style={{ color: '#f00' }}><i className="fa-brands fa-youtube" /> YOUTUBE -&gt; REPORT</h3>
              <p style={{ marginTop: '1rem' }}>Invece di guardare ore di video a caso:</p>
              <ul style={{ marginTop: '1rem' }}>
                <li>Estrai il succo.</li>
                <li>Condividi il report.</li>
                <li>Decidi azioni concrete.</li>
              </ul>
            </div>
          </div>

          {/* SLIDE 18: SITI WEB & LANDING */}
          <div className="slide" id="slide-18">
            <h2>SITI WEB &amp; LANDING PAGE</h2>
            <div className="glass-panel fade-in-up delay-1" style={{ width: '80%', textAlign: 'center' }}>
              <i className="fa-solid fa-globe" style={{ fontSize: '4rem', color: 'var(--neon-blue)', marginBottom: '2rem' }} />
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>NON PIÙ UNA BROCHURE STATICA</h3>
              <p style={{ fontSize: '2rem' }}>
                La Landing Page dove vi siete iscritti...<br />
                <span className="highlight-blue">È STATA FATTA COSÌ.</span>
              </p>
              <p style={{ marginTop: '1rem' }}>Intero sito dell&apos;evento + Test Digitalizzazione Aziendale.</p>
              <p style={{ marginTop: '1rem', fontSize: '1.5rem', color: 'var(--neon-green)' }}>Indicizzato perfettamente su Google grazie all&apos;AI SEO, senza agenzia.</p>
            </div>
          </div>

          {/* SLIDE 18b: CRM & BACKEND */}
          <div className="slide" id="slide-18b">
            <h2>COSA C&apos;È DIETRO LE QUINTE?</h2>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="glass-panel fade-in-up delay-1">
                <h3 className="highlight-purple">Quello che vedi</h3>
                <p>Design accattivante.</p>
                <p>Copy persuasivo.</p>
                <p>Esperienza utente fluida.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2" style={{ borderColor: 'var(--neon-green)' }}>
                <h3 className="highlight-green">IL DIETRO LE QUINTE (Il Motore)</h3>
                <p>CRM Admin personalizzato.</p>
                <p>Gestione Iscrizioni in tempo reale.</p>
                <p>Invio automatico Email &amp; WhatsApp.</p>
              </div>
            </div>
            <p className="fade-in-up delay-3" style={{ marginTop: '3rem', fontSize: '2rem' }}>
              &quot;Un ecosistema che lavora dietro le quinte mentre tu dormi.&quot;
            </p>
          </div>

          {/* SLIDE 18c: CUSTOM APPS */}
          <div className="slide" id="slide-18c">
            <h2>APP &amp; GESTIONALI SU MISURA</h2>
            <p style={{ marginBottom: '2rem' }}>Non semplici automazioni, ma veri software aziendali.</p>
            <div className="grid-3">
              <div className="glass-panel fade-in-up delay-1">
                <i className="fa-solid fa-chart-line" style={{ fontSize: '3rem', color: 'var(--neon-red)', marginBottom: '1rem' }} />
                <h3>DIREZIONE COMMERCIALE</h3>
                <p>Monitoraggio KPI agenti.</p>
                <p>Previsioni di vendita.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <i className="fa-solid fa-truck-fast" style={{ fontSize: '3rem', color: 'var(--neon-blue)', marginBottom: '1rem' }} />
                <h3>LOGISTICA</h3>
                <p>Tracciamento flussi.</p>
                <p>Ottimizzazione magazzino.</p>
              </div>
              <div className="glass-panel fade-in-up delay-3">
                <i className="fa-solid fa-coins" style={{ fontSize: '3rem', color: 'var(--neon-green)', marginBottom: '1rem' }} />
                <h3>FINANZA &amp; MARGINI</h3>
                <p>Controllo costi in tempo reale.</p>
                <p>Analisi marginalità per commessa.</p>
              </div>
            </div>
          </div>

          {/* SLIDE 18d: PREVENTIVATORE AI */}
          <div className="slide" id="slide-18d">
            <h2 style={{ color: 'var(--neon-purple)', borderColor: 'var(--neon-purple)' }}>L&apos;APP CHE TUTTI VOGLIONO</h2>
            <h1 className="glitch-effect" style={{ fontSize: '4rem', marginBottom: '2rem' }}>PREVENTIVATORE AI</h1>
            <p style={{ fontSize: '2rem', marginBottom: '2rem' }}>ESEMPIO: EDILIZIA (Il settore più difficile per i preventivi)</p>
            <div className="grid-2">
              <div className="glass-panel fade-in-up delay-1">
                <h3 className="highlight-blue">STEP 1: DAI COMPUTI</h3>
                <p>Legge il Computo Metrico (PDF/Excel).</p>
                <p>Incrocia con il TUO Database (Materiali, Manodopera, Fornitori).</p>
                <p className="highlight-green">-&gt; PREVENTIVO PRONTO.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2">
                <h3 className="highlight-purple">STEP 2: DAL NULLA</h3>
                <p>Scrivi un PROMPT: &quot;Ristrutturazione bagno 6mq, piastrelle gres...&quot;</p>
                <p>1. L&apos;AI crea il Computo Metrico.</p>
                <p>2. L&apos;AI crea il Preventivo.</p>
              </div>
            </div>
          </div>

          {/* SLIDE 19: VIDEO CONTENT */}
          <div className="slide" id="slide-19">
            <h2>VIDEO &amp; CONTENUTI</h2>
            <div className="glass-panel fade-in-up delay-1" style={{ textAlign: 'center' }}>
              <i className="fa-solid fa-video" style={{ fontSize: '4rem', color: 'var(--neon-red)', marginBottom: '1rem' }} />
              <h3>HEYGEN &amp; AVATAR</h3>
              <p>Formazione interna.</p>
              <p>Onboarding collaboratori.</p>
              <p>Mini-corsi per clienti.</p>
              <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>&quot;La tua faccia e la tua voce, senza il tuo tempo.&quot;</p>
            </div>
          </div>

          {/* SLIDE 20: RIEPILOGO */}
          <div className="slide" id="slide-20">
            <h2>RIEPILOGO</h2>
            <div className="grid-2">
              <div className="glass-panel fade-in-up delay-1" style={{ borderColor: 'var(--neon-red)', opacity: 0.7 }}>
                <h3 style={{ color: 'var(--neon-red)' }}>DA</h3>
                <p>Dati sparsi.</p>
                <p>Lavoro manuale.</p>
                <p>Decisioni a sensazione.</p>
              </div>
              <div className="glass-panel fade-in-up delay-2" style={{ borderColor: 'var(--neon-green)' }}>
                <h3 className="highlight-green">A</h3>
                <p>Organizzazione ordinata.</p>
                <p>Automazioni intelligenti.</p>
                <p>Tempo per attività che creano davvero grande valore.</p>
              </div>
            </div>
            <p className="fade-in-up delay-3" style={{ marginTop: '2rem', fontSize: '2rem', textAlign: 'center' }}>
              &quot;Nessuno farà l&apos;AI al posto vostro. Potete delegare la tecnica, non la <span className="highlight-blue">STRATEGIA</span>.&quot;
            </p>
          </div>

          {/* SLIDE 21: CTA & OFFERS */}
          <div className="slide" id="slide-21">
            <h2 style={{ color: 'var(--neon-green)' }}>IL PROSSIMO PASSO</h2>
            <div className="grid-3" style={{ alignItems: 'start' }}>
              <div className="glass-panel fade-in-up delay-1" style={{ borderColor: 'var(--neon-blue)' }}>
                <h3 style={{ color: 'var(--neon-blue)' }}>CORSO AI &amp; MARKETING</h3>
                <p style={{ fontSize: '1.2rem' }}>3 Giornate + 2 Webinar</p>
                <ul style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                  <li>Automazione Processi</li>
                  <li>Agenti AI Personalizzati</li>
                  <li>Piano Editoriale 12 Mesi</li>
                </ul>
                <p className="price-highlight-blue">PROMO OGGI: 3.000€</p>
                <p style={{ fontSize: '1.2rem', textDecoration: 'line-through', opacity: 0.7 }}>(invece di 5.000€)</p>
              </div>
              <div className="glass-panel fade-in-up delay-2" style={{ borderColor: 'var(--neon-purple)' }}>
                <h3 style={{ color: 'var(--neon-purple)' }}>CHECK-UP DIGITALE</h3>
                <p style={{ fontSize: '1.2rem' }}>Analisi Processi &amp; Marketing</p>
                <ul style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                  <li>Mappa flussi</li>
                  <li>Roadmap AI</li>
                  <li>Analisi Brand</li>
                </ul>
                <p className="price-highlight-green" style={{ animationName: 'pulse-purple', textShadow: '0 0 10px var(--neon-purple)' }}>BUNDLE: 3.000€</p>
                <p style={{ fontSize: '1.2rem', textDecoration: 'line-through', opacity: 0.7 }}>(invece di 4.000€)</p>
              </div>
              <div className="glass-panel fade-in-up delay-3" style={{ borderColor: 'var(--neon-green)', background: 'rgba(0, 255, 65, 0.1)' }}>
                <h3 className="highlight-green">AGISCI ORA</h3>
                <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Non perdere l&apos;occasione.</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>COMPILA IL MODULO</p>
                <p style={{ fontSize: '1.5rem', opacity: 0.7 }}>Per bloccare l&apos;offerta.</p>
              </div>
            </div>
          </div>

          {/* SLIDE 22: SPAZIO ALLE VOSTRE DOMANDE */}
          <div className="slide" id="slide-22">
            <h1 className="main-title">SPAZIO ALLE VOSTRE DOMANDE</h1>
            <div className="glass-panel fade-in-up delay-1">
              <p className="subtitle" style={{ fontStyle: 'italic' }}>AUTOMATIZZA LA TUA AZIENDA.</p>
              <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />
              <p style={{ fontSize: '1.5rem' }}>PRENOTA IL TUO CHECK-UP ADESSO.</p>
            </div>
          </div>

          {/* SLIDE 23: THANK YOU */}
          <div className="slide" id="slide-23">
            <h1 className="main-title fade-in-up delay-1" style={{ fontSize: '6rem', color: 'var(--neon-blue)' }}>GRAZIE</h1>
            <h2 className="fade-in-up delay-2" style={{ fontSize: '3rem', marginTop: '2rem' }}>AI EXPERIENCE</h2>
            <p className="fade-in-up delay-3" style={{ marginTop: '3rem', fontSize: '1.5rem', opacity: 0.8 }}>
              Il futuro è nelle tue mani.
            </p>
          </div>
        </div>
      </div>
      </>
    </div>
  );
}

