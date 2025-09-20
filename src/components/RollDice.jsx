import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

const RollDice = ({ roleDice, currentDice }) => {
  const [isRolling, setIsRolling] = useState(false);

  const handleDiceRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    
    // Delay the actual dice roll for better UX
    setTimeout(() => {
      roleDice();
    }, 500);
    
    // Reset rolling state after animation
    setTimeout(() => {
      setIsRolling(false);
    }, 1500);
  };

  return (
    <DiceContainer>
      <div className="dice-section">
        <div className="dice-container">
          <div 
            className={`dice ${isRolling ? 'rolling' : ''}`} 
            onClick={handleDiceRoll}
          >
            <img 
              src={`/images/dice/dice_${currentDice}.png`} 
              alt={`Dice showing ${currentDice}`}
              className="dice-image"
            />
            <div className="dice-shadow" />
          </div>
          
          {isRolling && (
            <div className="rolling-overlay">
              <div className="spinning-dice">🎲</div>
              <div className="rolling-text">Rolling...</div>
            </div>
          )}

          {!isRolling && (
            <div className="click-hint">
              <span className="hint-icon">👆</span>
              <span>Click to roll</span>
            </div>
          )}
        </div>

        <div className="dice-info">
          <h3 className="dice-title">Roll the Dice</h3>
          <p className="dice-instruction">
            {isRolling ? "Rolling..." : "Click the dice to roll"}
          </p>
          <div className="dice-result">
            <span className="result-label">Last Roll:</span>
            <span className="result-value">{currentDice}</span>
          </div>
        </div>
      </div>

    </DiceContainer>
  );
};

export default RollDice;

const rollAnimation = keyframes`
  0% { 
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1);
    filter: brightness(1);
  }
  10% { 
    transform: rotateX(72deg) rotateY(36deg) rotateZ(18deg) scale(1.1);
    filter: brightness(1.2);
  }
  20% { 
    transform: rotateX(144deg) rotateY(72deg) rotateZ(36deg) scale(0.95);
    filter: brightness(1.4);
  }
  30% { 
    transform: rotateX(216deg) rotateY(108deg) rotateZ(54deg) scale(1.15);
    filter: brightness(1.6);
  }
  40% { 
    transform: rotateX(288deg) rotateY(144deg) rotateZ(72deg) scale(0.9);
    filter: brightness(1.8);
  }
  50% { 
    transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg) scale(1.2);
    filter: brightness(2);
  }
  60% { 
    transform: rotateX(432deg) rotateY(216deg) rotateZ(108deg) scale(0.85);
    filter: brightness(1.8);
  }
  70% { 
    transform: rotateX(504deg) rotateY(252deg) rotateZ(126deg) scale(1.1);
    filter: brightness(1.6);
  }
  80% { 
    transform: rotateX(576deg) rotateY(288deg) rotateZ(144deg) scale(0.95);
    filter: brightness(1.4);
  }
  90% { 
    transform: rotateX(648deg) rotateY(324deg) rotateZ(162deg) scale(1.05);
    filter: brightness(1.2);
  }
  100% { 
    transform: rotateX(720deg) rotateY(360deg) rotateZ(180deg) scale(1);
    filter: brightness(1);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
`;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 40px 0;
  padding: 40px 20px;

  .dice-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 60px;
    }
  }

  .dice-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .dice {
      position: relative;
      cursor: pointer;
      transition: var(--transition);
      transform-style: preserve-3d;
      perspective: 1000px;

      .dice-image {
        width: 120px;
        height: 120px;
        object-fit: contain;
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
        transition: var(--transition);
      }

      .dice-shadow {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 20px;
        background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3), transparent);
        border-radius: 50%;
        transition: var(--transition);
      }

      &:hover {
        transform: translateY(-10px);
        
        .dice-image {
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
        }
        
        .dice-shadow {
          width: 100px;
          height: 25px;
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.4), transparent);
        }
      }

      &:active {
        transform: translateY(-5px) scale(0.95);
      }

      &.rolling {
        animation: ${rollAnimation} 1.5s ease-in-out;
        
        .dice-image {
          animation: ${glow} 1.5s ease-in-out;
          filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8)) brightness(1.2);
        }
      }
    }

    .rolling-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      pointer-events: none;

      .spinning-dice {
        font-size: 3rem;
        animation: ${spin} 0.5s linear infinite;
        filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
      }

      .rolling-text {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--primary-color);
        text-transform: uppercase;
        letter-spacing: 2px;
        animation: ${pulse} 1s ease-in-out infinite;
      }
    }

    .click-hint {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--card-gradient);
      padding: 12px 20px;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-light);
      animation: ${bounce} 2s ease-in-out infinite;
      border: 2px solid var(--primary-color);
      margin-top: 10px;

      .hint-icon {
        font-size: 1.5rem;
        animation: ${pulse} 2s ease-in-out infinite;
      }

      span:last-child {
        font-weight: 600;
        color: var(--primary-color);
        font-size: 1rem;
      }
    }
  }

  .dice-info {
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }

    .dice-title {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .dice-instruction {
      font-size: 1.1rem;
      color: var(--text-dark);
      margin-bottom: 20px;
      font-weight: 600;
    }

    .dice-result {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--card-gradient);
      padding: 15px 25px;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-light);
      border: 2px solid rgba(255, 255, 255, 0.1);

      .result-label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-dark);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .result-value {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-color);
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }


  @media (max-width: 768px) {
    padding: 20px 10px;
    gap: 20px;

    .dice-container .dice .dice-image {
      width: 100px;
      height: 100px;
    }

    .dice-info .dice-title {
      font-size: 1.5rem;
    }
  }
`;
