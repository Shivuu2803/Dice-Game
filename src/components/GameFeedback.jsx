import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

const GameFeedback = ({ show, type, message, streak }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <FeedbackContainer className={type}>
      <div className="feedback-content">
        <div className="main-message">
          <span className="emoji">
            {type === 'success' ? '🎉' : type === 'error' ? '❌' : '🎲'}
          </span>
          <span className="text">{message}</span>
        </div>
        
        {streak && streak >= 2 && (
          <div className="streak-effect">
            <span className="streak-emoji">⚡</span>
            <span className="streak-text">
              {streak >= 5 ? 'ON FIRE!' : streak >= 3 ? 'Great streak!' : 'Good streak!'}
            </span>
          </div>
        )}

        {/* Particle Effects */}
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`} />
          ))}
        </div>
      </div>
    </FeedbackContainer>
  );
};

export default GameFeedback;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const particleFloat = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) rotate(360deg);
  }
`;

const FeedbackContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  animation: ${slideInUp} 0.5s ease-out, ${slideOutDown} 0.3s ease-in 2.7s forwards;

  .feedback-content {
    position: relative;
    padding: 30px 40px;
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-heavy);
    backdrop-filter: blur(10px);
    text-align: center;
    min-width: 300px;
    overflow: hidden;

    &.success {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.15));
      border: 3px solid var(--success-color);
      color: var(--success-color);

      .particle {
        background: var(--success-color);
      }
    }

    &.error {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.15));
      border: 3px solid var(--error-color);
      color: var(--error-color);

      .particle {
        background: var(--error-color);
      }
    }

    &.info {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15));
      border: 3px solid var(--primary-color);
      color: var(--primary-color);

      .particle {
        background: var(--primary-color);
      }
    }
  }

  .main-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 15px;

    .emoji {
      font-size: 2.5rem;
      animation: ${bounce} 1s ease-in-out infinite;
    }

    .text {
      font-size: 1.3rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .streak-effect {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    animation: ${pulse} 1s ease-in-out infinite;

    .streak-emoji {
      font-size: 1.5rem;
    }

    .streak-text {
      font-size: 1rem;
      font-weight: 700;
      color: var(--secondary-color);
    }
  }

  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;

    .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      opacity: 0.8;

      &.particle-0 {
        top: 20%;
        left: 10%;
        animation: ${particleFloat} 2s ease-out 0.2s;
      }

      &.particle-1 {
        top: 30%;
        left: 90%;
        animation: ${particleFloat} 2s ease-out 0.4s;
      }

      &.particle-2 {
        top: 60%;
        left: 20%;
        animation: ${particleFloat} 2s ease-out 0.6s;
      }

      &.particle-3 {
        top: 70%;
        left: 80%;
        animation: ${particleFloat} 2s ease-out 0.8s;
      }

      &.particle-4 {
        top: 40%;
        left: 50%;
        animation: ${particleFloat} 2s ease-out 1s;
      }

      &.particle-5 {
        top: 80%;
        left: 60%;
        animation: ${particleFloat} 2s ease-out 1.2s;
      }

      &.particle-6 {
        top: 15%;
        left: 70%;
        animation: ${particleFloat} 2s ease-out 1.4s;
      }

      &.particle-7 {
        top: 50%;
        left: 30%;
        animation: ${particleFloat} 2s ease-out 1.6s;
      }
    }
  }

  @media (max-width: 768px) {
    .feedback-content {
      padding: 20px 25px;
      min-width: 250px;

      .main-message {
        gap: 10px;

        .emoji {
          font-size: 2rem;
        }

        .text {
          font-size: 1.1rem;
        }
      }
    }
  }
`;
