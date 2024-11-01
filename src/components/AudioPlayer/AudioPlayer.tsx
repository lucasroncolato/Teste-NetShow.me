import React from 'react';
import styles from './AudioPlayer.module.css';
import ControlButton from './ControlButton';
import TimeDisplay from './TimeDisplay';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

interface AudioPlayerProps {
  currentTime: string;
  totalTime: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onPlayPause: () => void;
  isPlaying: boolean;
  onVolumeChange: (volume: number) => void;
  volume: number;
  onMuteToggle: () => void;
  isMuted: boolean;
  onFullscreenToggle: () => void; // Adiciona a prop para fullscreen
  isFullscreen: boolean; // Adiciona a prop para o estado de fullscreen
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentTime, totalTime, videoRef, onPlayPause, isPlaying, onVolumeChange, volume, onMuteToggle, isMuted, onFullscreenToggle, isFullscreen }) => {
  return (
    <section className={styles.audioPlayer} aria-label="Audio Player">
      <div className={styles.timeControls}>
        <TimeDisplay time={currentTime} label="Current Time" />
        <ProgressBar videoRef={videoRef} />
        <TimeDisplay time={totalTime} label="Total Time" />
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.leftControls}>
          <ControlButton iconSrc={isPlaying
            ? "https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/de9d637c524d7313501c658fa13cbe765b850d93f946610e450adffbb7b1ffdd?apiKey=0c364b68c1644e14b12786de4095f82b&"
            : "https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/1b76e9e35e31b7a418eaf282ce4c0e4e0?apiKey=0c364b68c1644e14b12786de4095f82b&"} label="Play/Pause"
            onClick={onPlayPause} />
          <ControlButton 
            iconSrc="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/14d8243a86bc130fa8da5393bce72d144b72f30159246f03bb90c112516e7a01?apiKey=0c364b68c1644e14b12786de4095f82b&"
            label="Mute" 
            onClick={onMuteToggle} 
          />
          <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
        </div>
        <div className={styles.rightControls}>
          <ControlButton iconSrc="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/dea79ddcc633ec1578e572811fbfaa9b01cb0a99a3c579fffa1454e0cb1ae415?apiKey=0c364b68c1644e14b12786de4095f82b&" label="Shuffle" />
          <ControlButton 
            iconSrc="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/10344c95d8eccd6a57118b86e8a266ee1e64580fb26df10dd7ffa23d8d9f1b98?apiKey=0c364b68c1644e14b12786de4095f82b&"
            label="Fullscreen" 
            onClick={onFullscreenToggle} 
          />
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
