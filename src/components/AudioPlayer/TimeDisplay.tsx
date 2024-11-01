
import React from 'react';
import './AudioPlayer.css';

interface TimeDisplayProps {
  time: string;
  label: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, label }) => {
  return (
    <div className="timeDisplay" aria-label={label}>
      {time}
    </div>
  );
};

export default TimeDisplay;