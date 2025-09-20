import styled, { keyframes, css } from "styled-components";
import { Button } from "../styled/Button";
import InteractiveEffects from "./InteractiveEffects";

const StartGame = ({ toggle }) => {
  const handleDiceClick = () => {
    toggle();
  };

  return (
    <Container>
      <div className="hero-section">
        <div className="dice-container">
          <img 
            src="/images/dices.png" 
            alt="dice image" 
            className="dice-image" 
            onClick={handleDiceClick}
          />
          <div className="floating-dice">
            <div className="dice dice-1" onClick={handleDiceClick}>🎲</div>
            <div className="dice dice-2" onClick={handleDiceClick}>🎲</div>
            <div className="dice dice-3" onClick={handleDiceClick}>🎲</div>
          </div>
        </div>
        
        <div className="content">
          <div className="title-container">
            <h1 className="main-title">
              <span className="title-word">DICE</span>
              <span className="title-word">GAME</span>
            </h1>
            <p className="subtitle">Roll your way to victory!</p>
            <p className="description">
              Select your lucky number, roll the dice, and watch your score grow. 
              But be careful - wrong guesses will cost you points!
            </p>
          </div>
          
          <div className="button-container">
            <Button onClick={toggle} className="play-button">
              🎮 Start Playing
            </Button>
          </div>
          
          <div className="features">
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>Strategic</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Fast-paced</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <span>Competitive</span>
            </div>
          </div>
        </div>
      </div>
      <InteractiveEffects />
    </Container>
  );
};

export default StartGame;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(50px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 60% 70%, rgba(249, 115, 22, 0.05) 0%, transparent 40%);
    animation: ${pulse} 8s ease-in-out infinite;
  }

  .hero-section {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    position: relative;
    z-index: 1;
    max-height: 90vh;
    overflow: hidden;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 30px;
      text-align: center;
      max-height: 85vh;
    }
  }

  .dice-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .dice-image {
      width: 100%;
      max-width: 350px;
      height: auto;
      filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
      animation: ${slideIn} 1s ease-out;
      cursor: pointer;
      transition: var(--transition);
      
      &:hover {
        transform: scale(1.05) rotate(5deg);
        filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3));
      }
    }

    .floating-dice {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: auto;

      .dice {
        position: absolute;
        font-size: 2rem;
        animation: ${float} 3s ease-in-out infinite;
        filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
        cursor: pointer;
        transition: var(--transition);
        
        &:hover {
          transform: scale(1.2) rotate(180deg);
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
        }
      }

      .dice-1 {
        top: 10%;
        left: 10%;
        animation-delay: 0s;
      }

      .dice-2 {
        top: 60%;
        right: 10%;
        animation-delay: 1s;
      }

      .dice-3 {
        bottom: 20%;
        left: 20%;
        animation-delay: 2s;
      }
    }
  }

  .content {
    animation: ${slideIn} 1s ease-out 0.3s both;

    .title-container {
      margin-bottom: 25px;

      .main-title {
        font-size: clamp(2.5rem, 6vw, 4.5rem);
        font-weight: 900;
        margin-bottom: 15px;
        line-height: 0.9;
        background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-pink) 50%, var(--secondary-color) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: flex;
        flex-direction: column;
        gap: 8px;
        filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3));

        .title-word {
          display: block;
          animation: ${slideIn} 1s ease-out;
          cursor: pointer;
          transition: var(--transition);
          
          &:hover {
            transform: scale(1.1);
            filter: brightness(1.2);
          }
          
          &:nth-child(1) {
            animation-delay: 0.5s;
          }
          
          &:nth-child(2) {
            animation-delay: 0.7s;
          }
        }
      }

      .subtitle {
        font-size: 1.3rem;
        color: var(--secondary-color);
        font-weight: 700;
        margin-bottom: 12px;
        animation: ${slideIn} 1s ease-out 0.9s both;
        text-shadow: 0 2px 4px rgba(249, 115, 22, 0.3);
      }

      .description {
        font-size: 1rem;
        color: var(--text-dark);
        line-height: 1.5;
        max-width: 400px;
        animation: ${slideIn} 1s ease-out 1.1s both;
        font-weight: 600;
      }
    }

    .button-container {
      margin-bottom: 25px;
      animation: ${slideIn} 1s ease-out 1.3s both;

      .play-button {
        transform: scale(1);
        transition: var(--transition);
        
        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .features {
      display: flex;
      gap: 20px;
      animation: ${slideIn} 1s ease-out 1.5s both;

      @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
      }

      .feature {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 15px;
        background: var(--card-gradient);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-light);
        transition: var(--transition);
        min-width: 90px;
        cursor: pointer;

        &:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: var(--shadow-colored);
          background: var(--card-gradient-hover);
          border: 2px solid var(--primary-light);
        }

        &:active {
          transform: translateY(-4px) scale(1.02);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 5px;
        }

        span:last-child {
          font-weight: 600;
          color: var(--primary-color);
          font-size: 0.9rem;
        }
      }
    }
  }
`;
