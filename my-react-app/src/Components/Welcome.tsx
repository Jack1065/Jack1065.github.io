import React, { useEffect } from 'react';

import './styling/Welcome.css';
const myPic = require('../MyPic.png');

type WelcomeProps = {
  onContinue: () => void;
};

const Welcome: React.FC<WelcomeProps> = ({ onContinue }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only Enter key dismisses the welcome
      if (e.key === 'Enter') {
        onContinue();
      }
      // ignore other keys (including Escape)
    };

    // focus the primary button for accessibility
    const timer = setTimeout(() => {
      const btn = document.querySelector('.welcome-cta') as HTMLButtonElement | null;
      btn?.focus();
    }, 50);

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer);
    };
  }, [onContinue]);

  return (
    <div className="welcome-root" role="dialog" aria-modal="true" aria-label="Welcome">
      <div className="welcome-inner">
        <img className="welcome-logo" src={myPic} alt="Welcome" />
        <h1 className="welcome-title">Welcome — I’m Jack Kurtz</h1>
        <p className="welcome-sub">Software Engineer</p>
        <div className="welcome-actions">
          <button className="welcome-cta" onClick={onContinue}>Enter</button>
        </div>
        <div className="welcome-hint">Press Enter to continue</div>
      </div>
    </div>
  );
};
    
export default Welcome;
