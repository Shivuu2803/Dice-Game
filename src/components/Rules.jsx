import styled, { keyframes, css } from "styled-components";

const Rules = () => {
  const rules = [
    {
      icon: "🎯",
      title: "Select Your Number",
      description: "Choose any number from 1 to 6 that you think will appear on the dice."
    },
    {
      icon: "🎲",
      title: "Roll the Dice",
      description: "Click on the dice to roll it and see what number appears."
    },
    {
      icon: "✅",
      title: "Correct Guess",
      description: "If your selected number matches the dice roll, you earn points equal to that number!"
    },
    {
      icon: "❌",
      title: "Wrong Guess",
      description: "If your guess is incorrect, 2 points will be deducted from your total score."
    },
    {
      icon: "🏆",
      title: "Win Condition",
      description: "Try to reach the highest score possible by making accurate predictions!"
    }
  ];

  return (
    <RulesContainer>
      <div className="rules-header">
        <h2 className="rules-title">
          <span className="title-icon">📋</span>
          How to Play
        </h2>
        <p className="rules-subtitle">Master the dice game with these simple rules</p>
      </div>

      <div className="rules-grid">
        {rules.map((rule, index) => (
          <RuleCard key={index} index={index}>
            <div className="rule-icon">{rule.icon}</div>
            <div className="rule-content">
              <h3 className="rule-title">{rule.title}</h3>
              <p className="rule-description">{rule.description}</p>
            </div>
            <div className="rule-number">{index + 1}</div>
          </RuleCard>
        ))}
      </div>

      <div className="rules-footer">
        <div className="tips-section">
          <h4 className="tips-title">💡 Pro Tips</h4>
          <ul className="tips-list">
            <li>Start with numbers you feel lucky about</li>
            <li>Keep track of your score to plan your strategy</li>
            <li>Remember: wrong guesses cost you 2 points!</li>
            <li>Have fun and don't worry about perfect scores</li>
          </ul>
        </div>
      </div>
    </RulesContainer>
  );
};

export default Rules;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const RulesContainer = styled.div`
  background: transparent;
  padding: 0;
  max-width: 1000px;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
  backdrop-filter: none;
  animation: ${slideIn} 0.8s ease-out;

  .rules-header {
    text-align: center;
    margin-bottom: 40px;

    .rules-title {
      font-size: 2.5rem;
      font-weight: 900;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;

      .title-icon {
        font-size: 2.5rem;
        animation: ${fadeIn} 1s ease-out 0.5s both;
      }
    }

    .rules-subtitle {
      font-size: 1.1rem;
      color: #cbd5e1;
      font-weight: 600;
    }
  }

  .rules-grid {
    display: grid;
    gap: 20px;
    margin-bottom: 40px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  .rules-footer {
    .tips-section {
      background: rgba(251, 191, 36, 0.1);
      padding: 25px;
      border-radius: var(--border-radius);
      border: 2px solid rgba(251, 191, 36, 0.2);

      .tips-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: #fbbf24;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .tips-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          position: relative;
          padding: 8px 0 8px 25px;
          color: #e2e8f0;
          font-weight: 600;
          line-height: 1.5;

          &::before {
            content: '✨';
            position: absolute;
            left: 0;
            top: 8px;
            font-size: 1rem;
          }

          &:hover {
            color: #fbbf24;
            transform: translateX(5px);
            transition: var(--transition);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 25px;
    margin: 20px;

    .rules-header .rules-title {
      font-size: 2rem;
      flex-direction: column;
      gap: 10px;
    }

    .rules-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const RuleCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  transition: var(--transition);
  animation: ${props => css`${slideIn} 0.8s ease-out ${props.index * 0.1 + 0.3}s both`};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #fbbf24, #f59e0b);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 1);
    border-color: rgba(251, 191, 36, 0.4);
  }

  .rule-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    display: block;
    text-align: center;
  }

  .rule-content {
    text-align: center;

    .rule-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rule-description {
      color: #475569;
      line-height: 1.6;
      font-size: 0.95rem;
      margin: 0;
      font-weight: 500;
    }
  }

  .rule-number {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  }

  @media (max-width: 768px) {
    padding: 20px;
    
    .rule-icon {
      font-size: 2rem;
    }

    .rule-content .rule-title {
      font-size: 1.1rem;
    }
  }
`;
