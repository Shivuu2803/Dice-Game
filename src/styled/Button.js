import styled from "styled-components"

export const Button = styled.button`
  color: var(--text-white);
  padding: 16px 32px;
  min-width: 220px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-pink) 50%, var(--secondary-color) 100%);
  border-radius: var(--border-radius-lg);
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-colored);
  transition: var(--transition-bounce);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 2px solid transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: var(--shadow-heavy);
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--accent-pink) 50%, var(--secondary-dark) 100%);
    border: 2px solid var(--primary-light);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-light);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: var(--shadow-medium);
    }
  }
`

export const OutlineButton = styled.button`
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 14px 30px;
  min-width: 220px;
  border-radius: var(--border-radius-lg);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-bounce);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-pink));
    transition: width 0.4s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--text-white);
    transform: translateY(-3px) scale(1.02);
    box-shadow: var(--shadow-colored);
    border-color: var(--primary-light);
    
    &::before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-light);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      color: var(--primary-color);
      
      &::before {
        width: 0;
      }
    }
  }
`

export const SecondaryButton = styled.button`
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-emerald) 100%);
  color: var(--text-white);
  padding: 16px 32px;
  min-width: 220px;
  border-radius: var(--border-radius-lg);
  border: 2px solid transparent;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-colored);
  transition: var(--transition-bounce);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: var(--shadow-heavy);
    background: linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-cyan) 100%);
    border-color: var(--accent-cyan);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-light);
  }
`

