import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioPlayer from './AudioPlayer';

const mockProps = {
  currentTime: '0:30',
  totalTime: '3:00',
  videoRef: { current: document.createElement('video') } as React.RefObject<HTMLVideoElement>,
  onPlayPause: jest.fn(),
  isPlaying: false,
  onVolumeChange: jest.fn(),
  volume: 50,
  onMuteToggle: jest.fn(),
  isMuted: false,
  onFullscreenToggle: jest.fn(),
  isFullscreen: false,
};

describe('AudioPlayer Component', () => {
  test('renders audio player with current and total time', () => {
    render(<AudioPlayer {...mockProps} />);

    expect(screen.getByText(mockProps.currentTime)).toBeInTheDocument();
    expect(screen.getByText(mockProps.totalTime)).toBeInTheDocument();
  });

  test('toggles play/pause when play button is clicked', () => {
    render(<AudioPlayer {...mockProps} />);
    const playButton = screen.getByLabelText('Play/Pause');

    fireEvent.click(playButton);
    expect(mockProps.onPlayPause).toHaveBeenCalled();
  });

  test('mutes and unmutes when mute button is clicked', () => {
    render(<AudioPlayer {...mockProps} />);
    const muteButton = screen.getByLabelText('Mute');

    fireEvent.click(muteButton);
    expect(mockProps.onMuteToggle).toHaveBeenCalled();
  });

  test('adjusts volume when volume control is changed', () => {
    render(<AudioPlayer {...mockProps} />);
    const volumeControl = screen.getByRole('slider');

    fireEvent.change(volumeControl, { target: { value: 75 } });
    expect(mockProps.onVolumeChange).toHaveBeenCalledWith(75);
  });

  test('toggles fullscreen when fullscreen button is clicked', () => {
    render(<AudioPlayer {...mockProps} />);
    const fullscreenButton = screen.getByLabelText('Fullscreen');

    fireEvent.click(fullscreenButton);
    expect(mockProps.onFullscreenToggle).toHaveBeenCalled();
  });
});
