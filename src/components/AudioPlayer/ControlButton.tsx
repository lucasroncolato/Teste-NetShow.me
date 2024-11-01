import React from 'react';
import styles from './AudioPlayer.module.css';

interface ControlButtonProps {
  iconSrc: string;
  label: string;
  onClick?: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ iconSrc, label, onClick }) => {
  return (
    <button className={styles.controlButton} aria-label={label} onClick={onClick}>
      <img src={iconSrc} alt="" className={styles.controlIcon} />
      <span className={styles['visually-hidden']}>{label}</span>
    </button>
  );
};

export default ControlButton;
