
import React from 'react';
import './VideoContent.css';

interface RelatedContentProps {
  content: Array<{
    image: string;
    category: string;
    title: string;
  }>;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ content }) => {
  return (
    <section className="relatedContent">
      <h2 className="relatedTitle">Conteúdos relacionados</h2>
      <div className="relatedNavigation">
        <button className="seeMoreButton">
          Veja mais
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/edf8ea29e0c085a0b1e5a9df9133a5a1362f23e4601bf7d99d6cecd560741043?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="arrowIcon" />
        </button>
      </div>
      <div className="relatedItems">
        {content.map((item, index) => (
          <article key={index} className="relatedItem">
            <img src={item.image} alt="" className="relatedImage" />
            <div className="relatedItemDetails">
              <span className="relatedCategory">{item.category}</span>
              <h3 className="relatedItemTitle">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedContent;