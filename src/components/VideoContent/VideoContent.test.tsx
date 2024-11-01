import React, { act } from 'react'; // Importar React
import { render, screen, fireEvent } from '@testing-library/react';
import VideoContent from './VideoContent';
import * as api from '../../services/api'; // Ajuste o caminho conforme necessário

// Mock para as funções da API
jest.mock('../../services/api', () => ({
  getVideoById: jest.fn(),
  likeVideo: jest.fn(),
  dislikeVideo: jest.fn(),
}));

// Mock props para o componente
const mockProps = {
  title: "O bem como modelo de negócio",
  category: "2",
  date: "09/08/2021",
  duration: "N/A",
  videoSrc: "https://nsm-video.netshow.me/08467dc2-8619-40a6-a38c-21384a1e529d/7dd880a8-2618-4afd-ba69-86c838f0b20f/playlist.m3u8",
  summary: "Uma conversa sobre empresas e projetos que nascem com o propósito de fazer o bem, e se esse modelo de negócio é realmente lucrativo. Dá pra ganhar dinheiro fazendo o bem? E como fazer isso?\r\n\r\nAmanda Graciano, LinkedIn Top Voice | TEDx Speaker\r\nVicente Carvalho - Fundador e CEO da Razões para Acreditar",
  complementaryFiles: [],
  text: "Uma conversa sobre empresas e projetos que nascem com o propósito de fazer o bem, e se esse modelo de negócio é realmente lucrativo. Dá pra ganhar dinheiro fazendo o bem? E como fazer isso?\r\n\r\nAmanda Graciano, LinkedIn Top Voice | TEDx Speaker\r\nVicente Carvalho - Fundador e CEO da Razões para Acreditar",
  audioSrc: "",
  relatedContent: [],
  videoId: "46099",
  likes: 0,
};

describe('VideoContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing and shows loading initially', async () => {
    (api.getVideoById as jest.Mock).mockResolvedValueOnce({ likes: 0 });

    await act(async () => {
      render(<VideoContent {...mockProps} />);
    });

    // Verifica se o SkeletonLoader é exibido
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('fetches video data and displays it', async () => {
    const mockVideoData = { likes: 5 };
    (api.getVideoById as jest.Mock).mockResolvedValueOnce(mockVideoData);

    await act(async () => {
      render(<VideoContent {...mockProps} />);
    });

    // Aguarda a finalização do carregamento
    await screen.findByText(mockProps.title);

    // Verifica se os dados do vídeo foram renderizados
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.category)).toBeInTheDocument();
    expect(screen.getByText(mockProps.summary)).toBeInTheDocument();
    expect(screen.getByText("Likes: 5")).toBeInTheDocument();
  });

  it('handles like and dislike actions', async () => {
    const mockVideoData = { likes: 2 };
    (api.getVideoById as jest.Mock).mockResolvedValueOnce(mockVideoData);
    (api.likeVideo as jest.Mock).mockResolvedValueOnce({ likes: 3 });
    (api.dislikeVideo as jest.Mock).mockResolvedValueOnce({ likes: 1 });

    await act(async () => {
      render(<VideoContent {...mockProps} />);
    });

    // Aguarda a finalização do carregamento
    await screen.findByText(mockProps.title);

    const likeButton = screen.getByText(/like/i);
    const dislikeButton = screen.getByText(/dislike/i);

    // Clica no botão de like
    await act(async () => {
      fireEvent.click(likeButton);
    });
    expect(api.likeVideo).toHaveBeenCalledWith(mockProps.videoId);
    expect(await screen.findByText("Likes: 3")).toBeInTheDocument();

    // Clica no botão de dislike
    await act(async () => {
      fireEvent.click(dislikeButton);
    });
    expect(api.dislikeVideo).toHaveBeenCalledWith(mockProps.videoId);
    expect(await screen.findByText("Likes: 1")).toBeInTheDocument();
  });
});
