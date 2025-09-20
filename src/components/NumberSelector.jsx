import styled, { keyframes, css } from "styled-components";

const NumberSelector = ({
  error,
  setError,
  selectedNumber,
  setSelectedNumber,
}) => {

  const arrNumber = [1, 2, 3, 4, 5, 6];

  const numberSelectorHandler = (value) => {
    setSelectedNumber(value);
    setError("");
    
    // Add haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <NumberSelectorContainer>
      <div className="selector-header">
        <h3 className="selector-title">Choose Your Number</h3>
        <p className="selector-subtitle">Select a number to predict the dice roll</p>
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}
      </div>
      
      <div className="number-grid">
        {arrNumber.map((value, i) => (
          <NumberBox
            isSelected={value == selectedNumber}
            key={i}
            onClick={() => numberSelectorHandler(value)}
            className="number-box"
            value={value}
          >
            <span className="number-value">{value}</span>
            <div className="number-glow" />
          </NumberBox>
        ))}
      </div>
      
      <div className="selection-info">
        {selectedNumber && (
          <div className="selected-info">
            <span className="selected-icon">🎯</span>
            <span>Selected: <strong>{selectedNumber}</strong></span>
          </div>
        )}
      </div>
    </NumberSelectorContainer>
  );
};

export default NumberSelector;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const NumberSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 400px;

  .selector-header {
    text-align: center;
    margin-bottom: 10px;

    .selector-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .selector-subtitle {
      font-size: 0.9rem;
      color: var(--text-dark);
      margin-bottom: 15px;
      font-weight: 500;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid var(--error-color);
      color: var(--error-color);
      padding: 12px 16px;
      border-radius: var(--border-radius);
      font-size: 0.9rem;
      font-weight: 600;
      animation: ${shake} 0.5s ease-in-out;
      margin-top: 10px;

      .error-icon {
        font-size: 1.2rem;
      }
    }
  }

  .number-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    width: 100%;
    max-width: 280px;
  }

  .selection-info {
    margin-top: 10px;

    .selected-info {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--card-gradient);
      padding: 12px 20px;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-light);
      border: 2px solid var(--success-color);
      animation: ${bounce} 0.6s ease-out;

      .selected-icon {
        font-size: 1.2rem;
      }

      span {
        font-size: 1rem;
        font-weight: 600;
        color: var(--primary-color);
      }
    }
  }

  @media (max-width: 768px) {
    .number-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      max-width: 240px;
    }

    .selector-header .selector-title {
      font-size: 1.3rem;
    }
  }
`;

const NumberBox = styled.div`
  height: 80px;
  width: 80px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  border: 3px solid transparent;
  background: var(--card-gradient);
  box-shadow: var(--shadow-light);

  .number-value {
    position: relative;
    z-index: 2;
    color: ${(props) => (props.isSelected ? "white" : "var(--primary-color)")};
    transition: var(--transition);
  }

  .number-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => 
      props.isSelected 
        ? "linear-gradient(135deg, var(--primary-color), var(--secondary-color))"
        : "transparent"
    };
    transition: var(--transition);
    z-index: 1;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: var(--shadow-heavy);
    border-color: var(--primary-color);
    
    .number-glow {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    }
    
    .number-value {
      color: white;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  ${props => props.isSelected && css`
    animation: ${pulse} 2s ease-in-out infinite;
    transform: translateY(-5px) scale(1.05);
    box-shadow: var(--shadow-heavy);
    border-color: var(--primary-color);
    
    .number-value {
      color: white;
    }
  `}

  @media (max-width: 768px) {
    height: 70px;
    width: 70px;
    font-size: 1.8rem;
  }
`;
