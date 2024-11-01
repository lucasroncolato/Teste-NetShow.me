import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentDetails from './ContentDetails';

const mockProps = {
  title: 'Teste de Conteúdo',
  category: 'Categoria 1',
  date: '2023-10-01',
  summary: 'Resumo do conteúdo',
  complementaryFiles: [
    { name: 'Arquivo 1', url: 'https://example.com/arquivo1.pdf' },
    { name: 'Arquivo 2', url: 'https://example.com/arquivo2.pdf' },
  ],
  text: 'Texto completo do conteúdo',
  audioSrc: 'https://example.com/audio.mp3',
  videoId: '12345',
  likes: 5,
  onLike: jest.fn(),
  onDislike: jest.fn(),
};

describe('ContentDetails Component', () => {
  test('renders ContentDetails with all props', () => {
    render(<ContentDetails {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.category)).toBeInTheDocument();
    expect(screen.getByText(new Date(mockProps.date).toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(mockProps.summary)).toBeInTheDocument();
    expect(screen.getByText('Gostei (5)')).toBeInTheDocument();
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
  });

  test('renders complementary files or message when none are available', () => {
    const { rerender } = render(<ContentDetails {...mockProps} />);
    mockProps.complementaryFiles.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
    });

    rerender(<ContentDetails {...mockProps} complementaryFiles={[]} />);
    expect(screen.getByText('Nenhum arquivo complementar disponível.')).toBeInTheDocument();
  });

  test('handles like button click', async () => {
    render(<ContentDetails {...mockProps} />);
    const likeButton = screen.getByRole('button', { name: /gostei/i });

    fireEvent.click(likeButton);
    await waitFor(() => expect(mockProps.onLike).toHaveBeenCalled());
  });

  test('handles dislike button click', async () => {
    render(<ContentDetails {...mockProps} />);
    const dislikeButton = screen.getByRole('button', { name: /não é pra mim/i });

    fireEvent.click(dislikeButton);
    await waitFor(() => expect(mockProps.onDislike).toHaveBeenCalled());
  });

  test('renders audio player with correct src', () => {
    render(<ContentDetails {...mockProps} />);
    const audioElement = screen.getByRole('audio') as HTMLAudioElement;

    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', mockProps.audioSrc);
  });
});
