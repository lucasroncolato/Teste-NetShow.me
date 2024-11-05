import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import './VideoContent.css';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { updateWatchTime } from '../../services/api';

interface VideoPlayerProps {
  src: string;
  duration: string;
  videoId: string;
  initialTimeWatched?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, duration, videoId, initialTimeWatched }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [formattedDuration, setFormattedDuration] = useState('0:00');
  const [currentTimeVideo, setCurrentTimeVideo] = useState(initialTimeWatched);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && videoRef.current.currentTime > 0) {
        setCurrentTimeVideo(videoRef.current.currentTime);
        saveWatchTime(videoId, videoRef.current.currentTime);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [videoId]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const onLoadedData = () => {
        setIsLoading(false);
        setCurrentTimeVideo(initialTimeWatched || 0);
        videoElement.currentTime = initialTimeWatched || 0;
      };

      videoElement.addEventListener('loadeddata', onLoadedData);

      return () => {
        videoElement.removeEventListener('loadeddata', onLoadedData);
      };
    }
  }, [initialTimeWatched]);


  const saveWatchTime = async (id: string, time: number) => {
    try {
      await updateWatchTime(id, time);
    } catch (error) {
      console.error("Erro ao salvar o tempo assistido:", error);
    }
  };


  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const totalDuration = parseFloat(duration);
    if (!isNaN(totalDuration)) {
      setFormattedDuration(formatDuration(totalDuration));
    } else {
      console.warn("Duração inválida recebida, deve ser um número:", duration);
    }
  }, [duration]);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (videoRef.current) {
        const timeInMinutes = Math.floor(videoRef.current.currentTime / 60);
        const timeInSeconds = Math.floor(videoRef.current.currentTime % 60);
        setCurrentTime(`${timeInMinutes}:${timeInSeconds < 10 ? '0' : ''}${timeInSeconds}`);
      }
    };

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateCurrentTime);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => { });

        videoElement.addEventListener('waiting', () => {
          setIsLoading(true);
        });

        videoElement.addEventListener('playing', () => {
          setIsLoading(false);
        });

        return () => {
          hls.destroy();
          videoElement.removeEventListener('waiting', () => setIsLoading(true));
          videoElement.removeEventListener('playing', () => setIsLoading(false));
        };
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = src;
      }
    }
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, [src]);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;

    if (videoElement && audioElement) {
      if (isPlaying) {
        videoElement.pause();
        audioElement.pause();
      } else {
        videoElement.play().catch((error) => {
          console.error('Erro ao tentar reproduzir:', error);
        });
        audioElement.play().catch((error) => {
          console.error('Erro ao tentar reproduzir o áudio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error('Erro ao tentar iniciar automaticamente:', error);
      });
      setIsPlaying(true);
    }
  }, []);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(previousVolume);
    } else {
      setPreviousVolume(volume);
      handleVolumeChange(0);
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      if (!isFullscreen) {
        videoElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <section className="videoPlayer">
      <div className="videoWrapper">
        {isLoading && (
          <div className="loadingIndicator">
            <div id="loading-wrapper">
              <div id="loading-text">LOADING</div>
              <div id="loading-content"></div>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          controls={false}
          className="video"
          preload="metadata"
          onClick={togglePlayPause}
        >
          Your browser does not support the video tag.
        </video>
        <audio ref={audioRef} preload="metadata" />
      </div>
      <div className="videoControls">
        <AudioPlayer
          currentTime={currentTime}
          totalTime={formattedDuration}
          videoRef={videoRef}
          onPlayPause={togglePlayPause}
          isPlaying={isPlaying}
          onVolumeChange={handleVolumeChange}
          volume={volume}
          onMuteToggle={toggleMute}
          isMuted={isMuted}
          onFullscreenToggle={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </div>
      <button className="closeButton" aria-label="Close video">
        <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/c8c5f13e63ce2de7071cc0377b3913a113e8abc849d6be309ef7e6c96fbdf404?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="closeIcon" />
      </button>
    </section>
  );
};

export default VideoPlayer;
