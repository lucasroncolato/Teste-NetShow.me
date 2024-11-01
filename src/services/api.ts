import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Função para obter todos os vídeos
export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error; // ou trate o erro como preferir
  }
};

// Função para obter um vídeo por ID
export const getVideoById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video with id ${id}:`, error);
    throw error; // ou trate o erro como preferir
  }
};

// Função para obter vídeos por categoria
export const getVideosByCategory = async () => {
  const { data: videos } = await axios.get(`${BASE_URL}/videos`);
  const { data: categories } = await axios.get(`${BASE_URL}/categories`);
  
  return categories.map((category: any) => ({
    id: category.id,
    name: category.title,
    items: videos.filter((video: any) => Number(video.category) === Number(category.id)),
  }));
};

// Função para curtir um vídeo
export const likeVideo = async (id: string) => {
  try {
    // Faz uma requisição GET primeiro para obter os dados atuais
    const video = await getVideoById(id);
    // Atualiza o número de likes
    const updatedLikes = video.likes + 1;
    // Faz uma requisição PUT para atualizar o vídeo
    const response = await axios.patch(`${BASE_URL}/videos/${id}`, {
      likes: updatedLikes,
    });
    return response.data;
  } catch (error) {
    console.error(`Error liking video with id ${id}:`, error);
    throw error; // ou trate o erro como preferir
  }
};

// Função para descurtir um vídeo
export const dislikeVideo = async (id: string) => {
  try {
    // Faz uma requisição GET primeiro para obter os dados atuais
    const video = await getVideoById(id);
    // Atualiza o número de likes
    const updatedLikes = Math.max(video.likes - 1, 0); // não permitir likes negativos
    // Faz uma requisição PUT para atualizar o vídeo
    const response = await axios.patch(`${BASE_URL}/videos/${id}`, {
      likes: updatedLikes,
    });
    return response.data;
  } catch (error) {
    console.error(`Error disliking video with id ${id}:`, error);
    throw error; // ou trate o erro como preferir
  }
};
