
import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoContent from './VideoContent';

const mockProps = {
  title: 'Test Video',
  category: 'Test Category',
  date: '01/01/2023',
  duration: '01:30:00',
  videoSrc: 'http://example.com/video.mp4',
  summary: 'This is a test summary',
  complementaryFiles: [{ name: 'Test File', url: 'http://example.com/file.pdf' }],
  text: 'This is test content text',
  audioSrc: 'http://example.com/audio.mp3',
  relatedContent: [
    {
      image: 'http://example.com/image.jpg',
      category: 'Related Category',
      title: 'Related Content Title',
    },
  ],
};

describe('VideoContent', () => {
  it('renders without crashing', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });
  it('shows the category', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('displays the summary', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByText('This is a test summary')).toBeInTheDocument();
  });

  it('renders complementary files', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByText('Test File')).toBeInTheDocument();
  });

  it('shows related content', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByText('Related Content Title')).toBeInTheDocument();
  });
});