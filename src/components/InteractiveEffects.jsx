import styled, { keyframes, css } from "styled-components";
import { useState, useEffect } from "react";

const InteractiveEffects = () => {
  const [particles, setParticles] = useState([]);

  const createParticle = (x, y) => {
    const colors = [
      '#8b5cf6', // primary purple
      '#ec4899', // accent pink
      '#06b6d4', // accent cyan
      '#f97316', // secondary orange
      '#22c55e', // accent emerald
      '#fbbf24', // accent yellow
    ];
    
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: 0.015,
    };
    setParticles(prev => [...prev, newParticle]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            life: particle.life - particle.decay,
            y: particle.y - 1,
            x: particle.x + (Math.random() - 0.5) * 2,
          }))
          .filter(particle => particle.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple particles with burst effect
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createParticle(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20), i * 30);
    }
  };

  return (
    <EffectsContainer onClick={handleClick}>
      {particles.map(particle => (
        <Particle
          key={particle.id}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
          }}
        />
      ))}
      <div className="sparkle-effect">
        <div className="sparkle sparkle-1">✨</div>
        <div className="sparkle sparkle-2">⭐</div>
        <div className="sparkle sparkle-3">💫</div>
      </div>
    </EffectsContainer>
  );
};

export default InteractiveEffects;

const sparkle = keyframes`
  0%, 100% { 
    opacity: 0; 
    transform: scale(0) rotate(0deg); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1) rotate(180deg); 
  }
`;

const EffectsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;

  .sparkle-effect {
    position: absolute;
    width: 100%;
    height: 100%;

    .sparkle {
      position: absolute;
      font-size: 1.5rem;
      animation: ${sparkle} 3s ease-in-out infinite;
      pointer-events: none;

      &.sparkle-1 {
        top: 20%;
        left: 15%;
        animation-delay: 0s;
      }

      &.sparkle-2 {
        top: 60%;
        right: 20%;
        animation-delay: 1s;
      }

      &.sparkle-3 {
        bottom: 30%;
        left: 70%;
        animation-delay: 2s;
      }
    }
  }
`;

const Particle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: floatUp 2s ease-out forwards;
`;

const floatUp = keyframes`
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(-100px) scale(0);
    opacity: 0;
  }
`;
