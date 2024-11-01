import '../stylesheets/VideoDetailScreen.css'
import { useEffect, useState } from 'react'
import VideoContent from '../components/VideoContent/VideoContent'
import { getVideoById } from '../services/api';
import { useParams } from 'react-router-dom';

export default function VideoDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        try {
          const data = await getVideoById(id);
          setVideo(data);
        } catch (error) {
          console.error("Error fetching video:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Video ID is undefined");
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <VideoContent
      title={video.title}
      category={video.category}
      date={new Date(video.created_at).toLocaleDateString()} // Formata a data
      duration="N/A" // Adicione a duração se disponível no JSON
      videoSrc={video.hls_path}
      summary={video.description}
      complementaryFiles={[]} // Adicione se houver dados de arquivos complementares
      text={video.description}
      audioSrc={''} // Adicione o caminho do áudio se disponível
      relatedContent={[]} // Adicione conteúdo relacionado, se houver
      videoId={`${id}`}    />
  );
}
