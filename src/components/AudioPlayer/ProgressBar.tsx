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

      // Clean up event listener on unmount
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef]);

  // Função para calcular e atualizar o tempo do vídeo
  const updateVideoTime = (offsetX: number) => {
    const rect = (document.querySelector(`.progressBar`) as HTMLElement).getBoundingClientRect();
    const newProgress = Math.max(0, Math.min((offsetX / rect.width) * 100, 100));
    
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.currentTime = (newProgress / 100) * videoElement.duration;
      setProgress(newProgress);
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const offsetX = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
    updateVideoTime(offsetX); // Atualiza o tempo do vídeo ao clicar na barra
  };

  const handleMouseDown = () => {
    setIsDragging(true); // Começa a arrastar
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const offsetX = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
      updateVideoTime(offsetX); // Atualiza o tempo do vídeo ao arrastar
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Para de arrastar
  };

  const handleMouseLeave = () => {
    setIsDragging(false); // Para de arrastar se o mouse sair da barra
  };

  return (
    <div
      className="progressBar"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleProgressClick}
      style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
    >
      <div className="progress" style={{ width: `${progress}%` }} />
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
