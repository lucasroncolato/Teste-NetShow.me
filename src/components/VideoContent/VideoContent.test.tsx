import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoContent from './VideoContent';
import { likeVideo, dislikeVideo, getVideoById } from '../../services/api';

jest.mock('../../services/api');

const mockProps = {
  title: "O bem como modelo de negócio",
  category: "2",
  date: "09/08/2021",
  duration: "N/A",
  videoSrc: "https://nsm-video.netshow.me/08467dc2-8619-40a6-a38c-21384a1e529d/7dd880a8-2618-4afd-ba69-86c838f0b20f/playlist.m3u8",
  summary: "Uma conversa sobre empresas e projetos que nascem com o propósito de fazer o bem...",
  complementaryFiles: [],
  text: "Uma conversa sobre empresas e projetos que nascem com o propósito de fazer o bem...",
  audioSrc: "",
  relatedContent: [],
  videoId: "46099",
};

describe('VideoContent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading skeleton initially', () => {
    render(<VideoContent {...mockProps} />);
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });

  test('fetches and displays video data', async () => {
    const mockVideoData = { likes: 5 };
    (getVideoById as jest.Mock).mockResolvedValue(mockVideoData);

    render(<VideoContent {...mockProps} />);
    await waitFor(() => expect(screen.getByText(mockProps.title)).toBeInTheDocument());
    expect(screen.getByText(`Likes: ${mockVideoData.likes}`)).toBeInTheDocument();
    expect(getVideoById).toHaveBeenCalledWith(mockProps.videoId);
  });

  test('handles like functionality', async () => {
    const initialLikes = 5;
    const updatedLikes = 6;
    (getVideoById as jest.Mock).mockResolvedValue({ likes: initialLikes });
    (likeVideo as jest.Mock).mockResolvedValue({ likes: updatedLikes });

    render(<VideoContent {...mockProps} />);
    await waitFor(() => expect(screen.getByText(`Likes: ${initialLikes}`)).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('like-button'));
    await waitFor(() => expect(screen.getByText(`Likes: ${updatedLikes}`)).toBeInTheDocument());
    expect(likeVideo).toHaveBeenCalledWith(mockProps.videoId);
  });

  test('handles dislike functionality', async () => {
    const initialLikes = 5;
    const updatedLikes = 4;
    (getVideoById as jest.Mock).mockResolvedValue({ likes: initialLikes });
    (dislikeVideo as jest.Mock).mockResolvedValue({ likes: updatedLikes });

    render(<VideoContent {...mockProps} />);
    await waitFor(() => expect(screen.getByText(`Likes: ${initialLikes}`)).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('dislike-button'));
    await waitFor(() => expect(screen.getByText(`Likes: ${updatedLikes}`)).toBeInTheDocument());
    expect(dislikeVideo).toHaveBeenCalledWith(mockProps.videoId);
  });

  test('displays error when failing to fetch video data', async () => {
    (getVideoById as jest.Mock).mockRejectedValue(new Error('Failed to fetch video'));

    render(<VideoContent {...mockProps} />);
    await waitFor(() => expect(screen.getByText('Failed to fetch video')).toBeInTheDocument());
  });

  test('displays error when failing to like video', async () => {
    const initialLikes = 5;
    (getVideoById as jest.Mock).mockResolvedValue({ likes: initialLikes });
    (likeVideo as jest.Mock).mockRejectedValue(new Error('Failed to like video'));

    render(<VideoContent {...mockProps} />);
    await waitFor(() => expect(screen.getByText(`Likes: ${initialLikes}`)).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('like-button'));
    await waitFor(() => expect(screen.getByText('Failed to like video')).toBeInTheDocument());
  });

  test('displays error when failing to dislike video', async () => {
    const initialLikes = 5;
    (getVideoById as jest.Mock).mockResolvedValue({ likes: initialLikes });
    (dislikeVideo as jest.Mock).mockRejectedValue(new Error('Failed to dislike video'));

    render(<VideoContent {...mockProps} />);
    await waitFor(() => expect(screen.getByText(`Likes: ${initialLikes}`)).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('dislike-button'));
    await waitFor(() => expect(screen.getByText('Failed to dislike video')).toBeInTheDocument());
  });
});
