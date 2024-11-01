
import React from 'react';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer', () => {
  it('renders without crashing', () => {
    render(<AudioPlayer currentTime="00:00" totalTime="55:59" />);
    expect(screen.getByLabelText('Audio Player')).toBeInTheDocument();
  });

  it('displays current and total time', () => {
    render(<AudioPlayer currentTime="00:00" totalTime="55:59" />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(screen.getByText('55:59')).toBeInTheDocument();
  });

  it('renders control buttons', () => {
    render(<AudioPlayer currentTime="00:00" totalTime="55:59" />);
    expect(screen.getByLabelText('Previous Track')).toBeInTheDocument();
    expect(screen.getByLabelText('Play/Pause')).toBeInTheDocument();
    expect(screen.getByLabelText('Shuffle')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeat')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(<AudioPlayer currentTime="00:00" totalTime="55:59" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders volume control', () => {
    render(<AudioPlayer currentTime="00:00" totalTime="55:59" />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });
});