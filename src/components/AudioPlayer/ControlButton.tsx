import React from 'react';
import './AudioPlayer.css';

interface ControlButtonProps {
  iconSrc?: React.ReactNode; 
  label: string;
  onClick?: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ iconSrc, label, onClick }) => {
  return (
    <button className="controlButton" aria-label={label} onClick={onClick}>
      <span className="controlIcon">
        {iconSrc}
      </span>
      <span className='visually-hidden'>{label}</span>
    </button>
  );
};

export default ControlButton;
