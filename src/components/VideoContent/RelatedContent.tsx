
import React from 'react';
import './VideoContent.css';
// @ts-ignore
import { Splide, SplideTrack } from '@splidejs/react-splide'
import RowItem from '../RowItem';

interface RelatedContentProps {
  content: Array<{
    image: string;
    category: string;
    title: string;
  }>;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ content }) => {
  console.log(content)
  return (
    <section className="relatedContent">
      <div className="relatedNavigation">
        <h2 className="relatedTitle">Conteúdos relacionados</h2>
        <button className="seeMoreButton">
          Veja mais
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/edf8ea29e0c085a0b1e5a9df9133a5a1362f23e4601bf7d99d6cecd560741043?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="arrowIcon" />
        </button>
      </div>
      <div className="row-container">
        <Splide hasTrack={false} options={{
          perPage: 6,
          padding: { left: '4%', right: '4%' },
          gap: '.4vw',
          lazyLoad: 'nearby',
          preloadPages: 2,
          speed: 750,
          easing: 'ease',
          drag: false,
          omitEnd: true,
          waitForTransition: true,
          breakpoints: {
            499: { perPage: 2 },
            799: { perPage: 3 },
            1099: { perPage: 4 },
            1399: { perPage: 5 },
          },
        }}>
          <SplideTrack>
            {content.map((item: any) => {
              return <RowItem item={item} key={item.videoId} category={'Conteúdos relacionados'} />
            })}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
};

export default RelatedContent;