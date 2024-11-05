import React from 'react';
import './AudioPlayer.css';
import ControlButton from './ControlButton';
import TimeDisplay from './TimeDisplay';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { PlayIcon, PauseIcon, VolumeIcon, ConfigIcon, FullIcon } from '../../Icons/Player';

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
  onFullscreenToggle: () => void;
  isFullscreen: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentTime, totalTime, videoRef, onPlayPause, isPlaying, onVolumeChange, volume, onMuteToggle, onFullscreenToggle }) => {
  return (
    <section className="audioPlayer" aria-label="Audio Player">
      <div className="timeControls">
        <TimeDisplay time={currentTime} label="Current Time" />
        <ProgressBar videoRef={videoRef} />
        <TimeDisplay time={totalTime} label="Total Time" />
      </div>
      <div className="controlsContainer">
        <div className="leftControls">

          <ControlButton iconSrc={isPlaying
            ? <PauseIcon size={30} color="white" />
            : <PlayIcon size={30} color="white" />} label="Play/Pause"
            onClick={onPlayPause} />
          <ControlButton
            iconSrc={<VolumeIcon size={30} color="white" />}
            label="Mute"
            onClick={onMuteToggle}
          />
          <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
        </div>
        <div className="rightControls">
          <ControlButton iconSrc={<ConfigIcon size={30} color="white"/>} label="Shuffle" />
          <ControlButton
            iconSrc={<FullIcon size={30} color="white"/>}
            label="Fullscreen"
            onClick={onFullscreenToggle}
          />
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
