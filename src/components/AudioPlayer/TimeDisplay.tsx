
import React from 'react';
import styles from './AudioPlayer.module.css';

interface TimeDisplayProps {
  time: string;
  label: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, label }) => {
  return (
    <div className={styles.timeDisplay} aria-label={label}>
      {time}
    </div>
  );
};

export default TimeDisplay;