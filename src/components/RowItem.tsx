import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { SplideSlide } from '@splidejs/react-splide';
import { useNavigate } from 'react-router-dom';

export default function RowItem({ item, category }: { item: any, category: any }) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isHoveringModal, setIsHoveringModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const elementRef = useRef<any>();

  const navigate = useNavigate();

  useEffect(() => {
    let timeout: number;
    if (isHovering) {
      timeout = setTimeout(() => {
        setShowModal(true);
      }, 400);
    }
    if (!isHoveringModal) setShowModal(false);

    return () => clearTimeout(timeout);
  }, [isHovering, isHoveringModal]);

  return (
    <>
      <SplideSlide className={`row-item}`} onClick={() => navigate(`/video/${item.id}`)}>
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
