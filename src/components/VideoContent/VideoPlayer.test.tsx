
import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

const mockProps = {
  src: 'http://example.com/video.mp4',
  duration: '01:30:00',
};

describe('VideoPlayer', () => {
  it('renders without crashing', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText('Your browser does not support the video tag.')).toBeInTheDocument();
  });

  it('displays the correct duration', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByText('01:30:00')).toBeInTheDocument();
  });

  it('renders video controls', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByLabelText('Rewind')).toBeInTheDocument();
    expect(screen.getByLabelText('Fast forward')).toBeInTheDocument();
    expect(screen.getByLabelText('Fullscreen')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<VideoPlayer {...mockProps} />);
    expect(screen.getByLabelText('Close video')).toBeInTheDocument();
  });
});