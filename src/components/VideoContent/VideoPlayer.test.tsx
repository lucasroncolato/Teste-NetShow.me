import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayer from './VideoPlayer';
import Hls from 'hls.js';

jest.mock('hls.js');

const mockProps = {
  src: 'https://example.com/test-video.m3u8',
  duration: '300', // 5 minutos em segundos
};

describe('VideoPlayer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders VideoPlayer component with loading indicator initially', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('initializes Hls.js when Hls is supported', async () => {
    const mockHlsInstance = {
      loadSource: jest.fn(),
      attachMedia: jest.fn(),
      on: jest.fn(),
      destroy: jest.fn(),
    };
    (Hls as unknown as jest.Mock).mockImplementation(() => mockHlsInstance);
    render(<VideoPlayer {...mockProps} />);
    
    await waitFor(() => expect(mockHlsInstance.loadSource).toHaveBeenCalledWith(mockProps.src));
    expect(mockHlsInstance.attachMedia).toHaveBeenCalled();
  });

  test('formats and displays video duration correctly', async () => {
    render(<VideoPlayer {...mockProps} />);
    await waitFor(() => expect(screen.getByText('5:00')).toBeInTheDocument()); // 300 segundos em 5:00
  });

  test('plays and pauses video and audio on togglePlayPause', async () => {
    render(<VideoPlayer {...mockProps} />);
    const videoElement = screen.getByRole('video') as HTMLVideoElement;

    videoElement.play = jest.fn();
    videoElement.pause = jest.fn();

    fireEvent.click(videoElement);
    expect(videoElement.play).toHaveBeenCalled();

    fireEvent.click(videoElement);
    expect(videoElement.pause).toHaveBeenCalled();
  });

  test('changes volume when handleVolumeChange is called', async () => {
    render(<VideoPlayer {...mockProps} />);
    const videoElement = screen.getByRole('video') as HTMLVideoElement;
    fireEvent.change(screen.getByLabelText('Volume slider'), { target: { value: '80' } });
    
    await waitFor(() => expect(videoElement.volume).toBe(0.8));
  });

  test('toggles mute state and volume correctly', async () => {
    render(<VideoPlayer {...mockProps} />);
    const videoElement = screen.getByRole('video') as HTMLVideoElement;

    fireEvent.click(screen.getByLabelText('Mute button'));
    await waitFor(() => expect(videoElement.volume).toBe(0));

    fireEvent.click(screen.getByLabelText('Mute button'));
    await waitFor(() => expect(videoElement.volume).toBe(0.5)); // Assume valor anterior era 50
  });

  test('toggles fullscreen mode correctly', async () => {
    render(<VideoPlayer {...mockProps} />);
    const videoElement = screen.getByRole('video') as HTMLVideoElement;
    videoElement.requestFullscreen = jest.fn();
    document.exitFullscreen = jest.fn();

    fireEvent.click(screen.getByLabelText('Fullscreen button'));
    expect(videoElement.requestFullscreen).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Fullscreen button'));
    expect(document.exitFullscreen).toHaveBeenCalled();
  });

  test('displays currentTime correctly as video plays', async () => {
    render(<VideoPlayer {...mockProps} />);
    const videoElement = screen.getByRole('video') as HTMLVideoElement;

    Object.defineProperty(videoElement, 'currentTime', { value: 120, writable: true });
    fireEvent.timeUpdate(videoElement);
    
    await waitFor(() => expect(screen.getByText('2:00')).toBeInTheDocument());
  });
});
