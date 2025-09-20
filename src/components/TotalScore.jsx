import styled, { keyframes, css } from "styled-components";

const TotalScore = ({ score, gameStats }) => {
  const getScoreColor = () => {
    if (score >= 100) return "var(--success-color)";
    if (score >= 50) return "var(--secondary-color)";
    if (score < 0) return "var(--error-color)";
    return "var(--primary-color)";
  };

  const getScoreEmoji = () => {
    if (score >= 100) return "🏆";
    if (score >= 50) return "🔥";
    if (score >= 20) return "👍";
    if (score >= 0) return "🎯";
    return "😅";
  };

  return (
    <ScoreContainer>
      <div className="score-card">
        <div className="score-header">
          <span className="score-emoji">{getScoreEmoji()}</span>
          <h3 className="score-label">Total Score</h3>
        </div>
        
        <div className="score-value-container">
          <h1 className="score-value" style={{ color: getScoreColor() }}>
            {score}
          </h1>
          <div className="score-bar">
            <div 
              className="score-fill" 
              style={{ 
                width: `${Math.min(Math.max(score + 50, 0), 100)}%`,
                background: `linear-gradient(90deg, ${getScoreColor()}, ${getScoreColor()}88)`
              }}
            />
          </div>
        </div>

        <div className="score-stats">
          <div className="stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">
              {score < 0 ? "Beginner" : 
               score < 20 ? "Rookie" : 
               score < 50 ? "Player" : 
               score < 100 ? "Expert" : "Master"}
            </span>
          </div>
          {gameStats && (
            <>
              <div className="stat">
                <span className="stat-label">Accuracy</span>
                <span className="stat-value">
                  {gameStats.totalRolls > 0 ? Math.round((gameStats.correctGuesses / gameStats.totalRolls) * 100) : 0}%
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Streak</span>
                <span className="stat-value">{gameStats.currentStreak}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </ScoreContainer>
  );
};

export default TotalScore;

const scoreUpdate = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
`;

const ScoreContainer = styled.div`
  .score-card {
    background: var(--card-gradient);
    border-radius: var(--border-radius-lg);
    padding: 30px;
    box-shadow: var(--shadow-medium);
    border: 2px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: var(--transition);
    min-width: 280px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-heavy);
      animation: ${glow} 2s ease-in-out infinite;
    }
  }

  .score-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;

    .score-emoji {
      font-size: 2.5rem;
      animation: ${scoreUpdate} 0.6s ease-out;
    }

    .score-label {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-dark);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .score-value-container {
    margin-bottom: 25px;

    .score-value {
      font-size: 4rem;
      font-weight: 900;
      text-align: center;
      margin: 0;
      line-height: 1;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${scoreUpdate} 0.6s ease-out;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .score-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 15px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

      .score-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }
      }
    }
  }

  .score-stats {
    display: flex;
    gap: 8px;

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: var(--border-radius);
      border-right: 1px solid rgba(255, 255, 255, 0.2);

      &:last-child {
        border-right: none;
      }

      .stat-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-dark);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--primary-color);
        text-align: center;
      }
    }
  }

  @media (max-width: 768px) {
    .score-card {
      min-width: 250px;
      padding: 20px;
    }

    .score-value {
      font-size: 3rem !important;
    }

    .score-header .score-emoji {
      font-size: 2rem;
    }

    .score-stats {
      flex-direction: column;
      gap: 6px;

      .stat {
        flex-direction: row;
        justify-content: space-between;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 10px 12px;

        &:last-child {
          border-bottom: none;
        }

        .stat-label {
          font-size: 0.8rem;
          margin-bottom: 0;
        }

        .stat-value {
          font-size: 1rem;
          text-align: right;
        }
      }
    }
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;
