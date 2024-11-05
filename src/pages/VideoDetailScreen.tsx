import '../stylesheets/VideoDetailScreen.css'
import { useEffect, useState } from 'react'
import VideoContent from '../components/VideoContent/VideoContent'
import { getVideoById, getVideosByCategoryId } from '../services/api';
import { useParams } from 'react-router-dom';

export default function VideoDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<any>(null);
  const [videoCategory, setVideoCategory] = useState<any>(null);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        try {
          const data = await getVideoById(id);
          setVideo(data);
        } catch (error) {
          console.error("Error fetching video:", error);
        } finally {
          setLoadingVideo(false);
        }
      } else {
        console.error("Video ID is undefined");
        setLoadingVideo(false);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const fetchCategoryVideos = async () => {
      if (video?.category) {
        try {
          const data = await getVideosByCategoryId(video.category);
          setVideoCategory(data);
        } catch (error) {
          console.error("Error fetching category videos:", error);
        } finally {
          setLoadingCategory(false);
        }
      }
    };

    if (video) fetchCategoryVideos();
  }, [video]);

  if (loadingVideo || loadingCategory) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <VideoContent
      title={video.title}
      category={video.category}
      date={new Date(video.created_at).toLocaleDateString()}
      duration="N/A"
      videoSrc={video.hls_path}
      summary={video.description}
      complementaryFiles={[]}
      text={video.description}
      audioSrc={''}
      relatedContent={videoCategory || []} // Garante que não seja nulo
      videoId={`${id}`}
    />
  );
}
