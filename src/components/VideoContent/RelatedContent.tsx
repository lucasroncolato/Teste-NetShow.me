
import React from 'react';
import styles from './VideoContent.module.css';

interface RelatedContentProps {
  content: Array<{
    image: string;
    category: string;
    title: string;
  }>;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ content }) => {
  return (
    <section className={styles.relatedContent}>
      <h2 className={styles.relatedTitle}>Conteúdos relacionados</h2>
      <div className={styles.relatedNavigation}>
        <button className={styles.seeMoreButton}>
          Veja mais
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/edf8ea29e0c085a0b1e5a9df9133a5a1362f23e4601bf7d99d6cecd560741043?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className={styles.arrowIcon} />
        </button>
      </div>
      <div className={styles.relatedItems}>
        {content.map((item, index) => (
          <article key={index} className={styles.relatedItem}>
            <img src={item.image} alt="" className={styles.relatedImage} />
            <div className={styles.relatedItemDetails}>
              <span className={styles.relatedCategory}>{item.category}</span>
              <h3 className={styles.relatedItemTitle}>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedContent;