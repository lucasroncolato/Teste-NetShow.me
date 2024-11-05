import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const getContinuarReproducao = async () => {
  const { data: videos } = await axios.get(`${BASE_URL}/videos`);
  return videos.filter((video: any) => video.timeWatched);
};

export const getVideoById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video with id ${id}:`, error);
    throw error;
  }
};

export const getVideosByCategory = async () => {
  const { data: videos } = await axios.get(`${BASE_URL}/videos`);
  const { data: categories } = await axios.get(`${BASE_URL}/categories`);

  return categories.map((category: any) => ({
    id: category.id,
    name: category.title,
    items: videos.filter((video: any) => Number(video.category) === Number(category.id)),
  }));
};

export const likeVideo = async (id: string) => {
  try {
    const video = await getVideoById(id);
    const updatedLikes = video.likes + 1;
    const response = await axios.patch(`${BASE_URL}/videos/${id}`, {
      likes: updatedLikes,
    });
    return response.data;
  } catch (error) {
    console.error(`Error liking video with id ${id}:`, error);
    throw error;
  }
};


export const dislikeVideo = async (id: string) => {
  try {
    const video = await getVideoById(id);
    const updatedLikes = Math.max(video.likes - 1, 0);
    const response = await axios.patch(`${BASE_URL}/videos/${id}`, {
      likes: updatedLikes,
    });
    return response.data;
  } catch (error) {
    console.error(`Error disliking video with id ${id}:`, error);
    throw error;
  }
};

export const updateWatchTime = async (id: string, timeWatched: number) => {
  try {
    const response = await axios.patch(`${BASE_URL}/videos/${id}`, { timeWatched });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o tempo assistido para o vídeo ${id}:`, error);
    throw error;
  }
};
