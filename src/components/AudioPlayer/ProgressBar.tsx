import React, { useEffect, useState } from 'react';
import './AudioPlayer.css';

interface ProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ videoRef }) => {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleTimeUpdate = () => {
        const percentage = (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(percentage);
      };

      videoElement.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef]);

  const updateVideoTime = (offsetX: number) => {
    const rect = (document.querySelector(`.progressAudioBar`) as HTMLElement).getBoundingClientRect();
    const newProgress = Math.max(0, Math.min((offsetX / rect.width) * 100, 100));

    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.currentTime = (newProgress / 100) * videoElement.duration;
      setProgress(newProgress);
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const offsetX = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
    updateVideoTime(offsetX);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const offsetX = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
      updateVideoTime(offsetX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="progressAudioBar"
      role="progressaudiobar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleProgressClick}
      style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
    >
      <div className="progressAudio" style={{ width: `${progress}%` }} />
      <div
        className="progressHandle"
        tabIndex={0}
        aria-label="Seek"
        style={{ right: `${100 - progress}%` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ProgressBar;
