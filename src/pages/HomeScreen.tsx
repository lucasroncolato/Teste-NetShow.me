import '../stylesheets/Home.css';
import '@splidejs/splide/css/core';
import Row from '../components/Row';
import Slider from "../components/Slider";
import SkeletonLoaderSlider from "../components/SkeletonLoaderSlider";
import SkeletonLoaderRow from "../components/SkeletonLoaderRow";
import { useEffect, useState } from 'react';
import { getVideosByCategory, getVideos, getContinuarReproducao } from '../services/api';

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [continuarReproducao, setContinuarReproducao] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getVideosByCategory();
      setCategories(data);
      setLoading(false);
    };
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideos(data);
      setLoading(false);
    };
    const fetchContinuarReproducao = async () => {
      const data = await getContinuarReproducao();
      setContinuarReproducao(data);
      setLoading(false);
    };

    fetchCategories();
    fetchVideos();
    fetchContinuarReproducao();
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonLoaderSlider />
      ) : (
        <Slider items={videos} />
      )}

      {loading ? (
        <SkeletonLoaderRow itemsCount={6} />
      ) : (
        continuarReproducao.length > 0 && (
          <Row key="continuar-reproducao" list={{ id: '4', name: 'Continuar Reprodução', items: continuarReproducao }} />
        )
      )}

      {loading ? (
        <SkeletonLoaderRow itemsCount={6} />
      ) : (
        categories.map((category) => (
          <Row key={category.id} list={category} />
        ))
      )}
    </>
  );
}
