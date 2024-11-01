import React from 'react';
import './AudioPlayer.css';

interface ControlButtonProps {
  iconSrc: string;
  label: string;
  onClick?: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ iconSrc, label, onClick }) => {
  return (
    <button className="controlButton" aria-label={label} onClick={onClick}>
      <img src={iconSrc} alt="" className="controlIcon" />
      <span className='visually-hidden'>{label}</span>
    </button>
  );
};

export default ControlButton;
