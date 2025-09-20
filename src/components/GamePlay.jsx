import styled, { keyframes, css } from "styled-components";
import NumberSelector from "./NumberSelector";
import TotalScore from "./TotalScore";
import RollDice from "./RollDice";
import { useState } from "react";
import { Button, OutlineButton, SecondaryButton } from "../styled/Button";
import Rules from "./Rules";

const GamePlay = () => {
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [gameStats, setGameStats] = useState({
    totalRolls: 0,
    correctGuesses: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastResult: null
  });
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultType, setResultType] = useState("");

  const generateRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }

    const randomNumber = generateRandomNum(1, 7);
    setCurrentDice((prev) => randomNumber);

    const isCorrect = selectedNumber == randomNumber;
    let newScore = score;
    let newStats = { ...gameStats };
    
    newStats.totalRolls += 1;

    if (isCorrect) {
      newScore += randomNumber;
      newStats.correctGuesses += 1;
      newStats.currentStreak += 1;
      if (newStats.currentStreak > newStats.bestStreak) {
        newStats.bestStreak = newStats.currentStreak;
      }
      newStats.lastResult = "correct";
      
      // Show success feedback
      setResultMessage(`Correct! +${randomNumber} points`);
      setResultType("success");
    } else {
      newScore -= 2;
      newStats.currentStreak = 0;
      newStats.lastResult = "incorrect";
      
      // Show failure feedback
      setResultMessage(`Wrong! -2 points (Rolled ${randomNumber})`);
      setResultType("error");
    }

    setScore(newScore);
    setGameStats(newStats);
    setSelectedNumber(undefined);
    setError("");
    
    // Show result feedback
    setShowResult(true);
    
    // Hide result after 2 seconds
    setTimeout(() => {
      setShowResult(false);
    }, 2000);

  };

  const resetScore = () => {
    setScore(0);
    setSelectedNumber(undefined);
    setError("");
    setGameStats({
      totalRolls: 0,
      correctGuesses: 0,
      currentStreak: 0,
      bestStreak: 0,
      lastResult: null
    });
    setShowResult(false);
  };

  const getAccuracy = () => {
    return gameStats.totalRolls > 0 ? Math.round((gameStats.correctGuesses / gameStats.totalRolls) * 100) : 0;
  };

  const getStreakMessage = () => {
    if (gameStats.currentStreak >= 5) return "🔥 ON FIRE!";
    if (gameStats.currentStreak >= 3) return "⚡ Great streak!";
    if (gameStats.currentStreak >= 2) return "👍 Good streak!";
    return "";
  };

  return (
    <MainContainer>
      <div className="game-header">
        <h1 className="game-title">🎲 Dice Game</h1>
        <p className="game-subtitle">Test your luck and strategy!</p>
        <div className="rolls-counter">
          <span className="rolls-label">Total Rolls:</span>
          <span className="rolls-number">{gameStats.totalRolls}</span>
        </div>
      </div>

      <div className="game-content">
        <div className="top-section">
          <TotalScore score={score} gameStats={gameStats} />
        <NumberSelector
          error={error}
          setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
          />
        </div>



        <div className="dice-area">
          <RollDice currentDice={currentDice} roleDice={roleDice} />
          
          {/* Enhanced Result Indicator */}
          {showResult && (
            <div className={`result-indicator ${resultType}`}>
              <div className="result-content">
                <div className="result-icon">
                  {resultType === "success" ? "🎉" : "💥"}
                </div>
                <div className="result-details">
                  <div className="result-title">
                    {resultType === "success" ? "CORRECT!" : "WRONG!"}
                  </div>
                  <div className="result-message">{resultMessage}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="controls-section">
          <div className="button-group">
            <OutlineButton onClick={resetScore} className="reset-btn">
              🔄 Reset Score
            </OutlineButton>
            <SecondaryButton onClick={() => setShowRules((prev) => !prev)} className="rules-btn">
              {showRules ? "📖 Hide Rules" : "📋 Show Rules"}
            </SecondaryButton>
          </div>
          
          {selectedNumber && (
            <div className="current-selection">
              <span className="selection-label">Your Selection:</span>
              <span className="selection-number">{selectedNumber}</span>
            </div>
          )}
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="rules-modal-overlay" onClick={() => setShowRules(false)}>
          <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h2 className="modal-title">Rules</h2>
                <p className="modal-subtitle">Learn how to play</p>
              </div>
              <button className="close-btn" onClick={() => setShowRules(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-content">
              <Rules />
            </div>
      </div>
      </div>
      )}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.main`
  min-height: 100vh;
  padding: 15px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow-y: auto;

  .game-header {
    text-align: center;
    margin-bottom: 15px;
    padding: 8px 0;

    .game-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-pink) 50%, var(--secondary-color) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
      filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3));
    }

    .game-subtitle {
      font-size: 1rem;
      color: var(--text-dark);
      font-weight: 600;
      margin-bottom: 10px;
    }

    .rolls-counter {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--card-gradient);
      padding: 8px 16px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-light);
      border: 1px solid rgba(139, 92, 246, 0.2);

      .rolls-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-dark);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .rolls-number {
        font-size: 1rem;
        font-weight: 800;
        color: var(--primary-color);
        background: linear-gradient(135deg, var(--primary-color), var(--accent-pink));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  .game-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .dice-area {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .result-indicator {
    position: absolute;
    top: 50%;
    right: -250px;
    transform: translateY(-50%);
    z-index: 100;
    animation: slideInFromRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    pointer-events: none;

    .result-content {
      display: flex;
    align-items: center;
    gap: 10px;
      padding: 12px 16px;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      min-width: 200px;
      text-align: left;

      &.success {
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.2));
        border-color: rgba(34, 197, 94, 0.3);
      }

      &.error {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.2));
        border-color: rgba(239, 68, 68, 0.3);
      }
    }

    &.success .result-content {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.2));
      border-color: rgba(34, 197, 94, 0.3);
    }

    &.error .result-content {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.2));
      border-color: rgba(239, 68, 68, 0.3);
    }

    .result-icon {
      font-size: 1.5rem;
      animation: bounce 0.6s ease-in-out;
    }

    .result-details {
      display: flex;
      flex-direction: column;
      gap: 2px;
      color: var(--text-dark);
      text-align: left;

      .result-title {
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .result-message {
        font-size: 0.8rem;
        font-weight: 500;
        opacity: 0.8;
      }
    }
  }

  /* Enhanced Animations */
  @keyframes slideInFromRight {
    0% {
      opacity: 0;
      transform: translateY(-50%) translateX(50px) scale(0.8);
    }
    50% {
      opacity: 1;
      transform: translateY(-50%) translateX(-10px) scale(1.05);
    }
    100% {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -10px, 0);
    }
    70% {
      transform: translate3d(0, -5px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  /* Rules Modal */
  .rules-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 60% 70%, rgba(249, 115, 22, 0.08) 0%, transparent 40%);
    backdrop-filter: blur(12px) saturate(120%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
    padding: 20px;
  }

  .rules-modal {
    background: linear-gradient(145deg, #1e293b 0%, #334155 50%, #475569 100%);
    border-radius: 16px;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 12px 24px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    max-width: 600px;
    width: 100%;
    max-height: 85vh;
    overflow: hidden;
    animation: modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px 20px 32px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);

      .modal-title-section {
        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 4px 0;
          line-height: 1.3;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modal-subtitle {
          font-size: 0.875rem;
          color: #cbd5e1;
          margin: 0;
          font-weight: 400;
          line-height: 1.4;
        }
      }

      .close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #cbd5e1;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

        svg {
          width: 14px;
          height: 14px;
        }

        &:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
          color: #f87171;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }

    .modal-content {
      padding: 32px;
      max-height: calc(85vh - 100px);
      overflow-y: auto;
      background: transparent;

      /* Custom scrollbar */
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #f59e0b, #d97706);
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }



  .top-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    width: 100%;
    max-width: 900px;
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
      max-width: 400px;
    }

    @media (max-width: 480px) {
      gap: 15px;
    }
  }

  .controls-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 500px;

    .button-group {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      justify-content: center;

      @media (max-width: 480px) {
        flex-direction: column;
        width: 100%;
        max-width: 280px;

        button {
          width: 100%;
          min-width: unset;
        }
      }
    }

    .current-selection {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--card-gradient);
      padding: 12px 20px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-light);
      border: 2px solid var(--success-color);
      animation: slideIn 0.5s ease-out;

      .selection-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .selection-number {
        font-size: 1.3rem;
        font-weight: 800;
        color: var(--success-color);
        background: linear-gradient(135deg, var(--success-color), #059669);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
    
    .game-header {
      margin-bottom: 15px;
      padding: 8px 0;
    }

    .game-content {
      gap: 18px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px;
    
    .game-header {
      margin-bottom: 12px;
      
      .game-title {
        font-size: 1.8rem;
      }
      
      .game-subtitle {
        font-size: 0.9rem;
      }
    }

    .game-content {
      gap: 15px;
    }
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

