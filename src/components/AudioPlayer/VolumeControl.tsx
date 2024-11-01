import React, { useEffect, useState } from 'react';
import './AudioPlayer.css';

interface VolumeControlProps {
  volume: number; // Propriedade do volume atual
  onVolumeChange: (volume: number) => void; // Função para alterar o volume
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const updateVolume = (offsetX: number) => {
    const rect = (document.querySelector(`.volumeControl`) as HTMLElement).getBoundingClientRect();
    const newVolume = Math.max(0, Math.min((offsetX / rect.width) * 100, 100));
    onVolumeChange(Math.round(newVolume)); // Atualiza o volume com o valor arredondado
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const offsetX = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
    updateVolume(offsetX); // Atualiza o volume ao clicar na barra
  };

  const handleMouseDown = () => {
    setIsDragging(true); // Começa a arrastar
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const offsetX = event.clientX - (event.currentTarget as HTMLElement).getBoundingClientRect().left;
      updateVolume(offsetX); // Atualiza o volume ao arrastar
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
      className="volumeControl"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
    >
      <div className="volumeBar" />
      <div className="volumeSlider" style={{ width: `${volume}%`, backgroundColor: 'rgba(43, 161, 218, 1)' }} />
      <div
        className="volumeHandle"
        style={{ left: `${volume}%`, backgroundColor: 'rgba(43, 161, 218, 1)' }}
      />
    </div>
  );
};

export default VolumeControl;
