
import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentDetails from './ContentDetails';

const mockProps = {
  title: 'Test Video',
  category: 'Test Category',
  date: '01/01/2023',
  summary: 'This is a test summary',
  complementaryFiles: [{ name: 'Test File', url: 'http://example.com/file.pdf' }],
  text: 'This is test content text',
  audioSrc: 'http://example.com/audio.mp3',
};

describe('ContentDetails', () => {
  it('renders without crashing', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('shows the category and date', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('Adicionar à minha lista')).toBeInTheDocument();
    expect(screen.getByText('Gostei')).toBeInTheDocument();
    expect(screen.getByText('Não é pra mim')).toBeInTheDocument();
    expect(screen.getByText('Compartilhar')).toBeInTheDocument();
  });

  it('displays the summary', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('This is a test summary')).toBeInTheDocument();
  });

  it('renders complementary files', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('Test File')).toBeInTheDocument();
  });

  it('shows the content text', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('This is test content text')).toBeInTheDocument();
  });

  it('renders audio player', () => {
    render(<ContentDetails {...mockProps} />);
    expect(screen.getByText('Your browser does not support the audio element.')).toBeInTheDocument();
  });
});