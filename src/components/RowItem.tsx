// @ts-ignore
import { SplideSlide } from '@splidejs/react-splide';
import { useNavigate } from 'react-router-dom';

export default function RowItem({ item, category }: { item: any, category: any }) {
  const navigate = useNavigate();

  return (
    <>
      <SplideSlide className={`row-item`} onClick={() => navigate(`/video/${item.id}`)}>
        <article key={item.id} className="contentItem">
          <img src={item.thumbnail} alt="" className="contentImage" />
          <div className="contentInfo">
            <p className="contentCategory">{category}</p>
            <h3 className="contentTitle">{item.title}</h3>
          </div>
        </article>
      </SplideSlide>
    </>
  );
}
