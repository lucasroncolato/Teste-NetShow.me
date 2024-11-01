import React, { useEffect, useState } from 'react';
import './VideoContent.css';
import VideoPlayer from './VideoPlayer';
import ContentDetails from './ContentDetails';
import RelatedContent from './RelatedContent';
import SkeletonLoader from './SkeletonLoaderVideoContent';
import { likeVideo, dislikeVideo, getVideoById } from '../../services/api'; // ajuste o caminho conforme necessário

interface VideoContentProps {
  title: string;
  category: string;
  date: string;
  duration: string;
  videoSrc: string;
  summary: string;
  complementaryFiles: Array<{ name: string, url: string }>;
  text: string;
  audioSrc: string;
  relatedContent: Array<{
    image: string;
    category: string;
    title: string;
  }>;
  videoId: string;
}

const VideoContent: React.FC<VideoContentProps> = ({
  title,
  category,
  date,
  duration,
  videoSrc,
  summary,
  complementaryFiles,
  text,
  audioSrc,
  relatedContent,
  videoId,
}) => {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<any>(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoData = await getVideoById(videoId);
        setVideo(videoData);
        setLikes(videoData.likes);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleLike = async () => {
    try {
      const updatedVideo = await likeVideo(videoId);
      setLikes(updatedVideo.likes);
    } catch (error) {
      console.error("Failed to like video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const updatedVideo = await dislikeVideo(videoId);
      setLikes(updatedVideo.likes);
    } catch (error) {
      console.error("Failed to dislike video:", error);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }
console.log(likes)
  return (
    <div className="videoContent">
      <VideoPlayer src={videoSrc} duration={duration} />
      <ContentDetails
        title={title}
        category={category}
        date={date}
        summary={summary}
        complementaryFiles={complementaryFiles}
        text={text}
        audioSrc={audioSrc}
        videoId={videoId}
        likes={likes}
        onLike={handleLike}
        onDislike={handleDislike}
      />
      <RelatedContent content={relatedContent} />
    </div>
  );
};

export default VideoContent;
