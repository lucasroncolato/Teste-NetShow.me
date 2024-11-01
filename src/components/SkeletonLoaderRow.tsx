import '../stylesheets/SkeletonLoaderRow.css';


export default function SkeletonLoaderRow({ itemsCount = 6 }) {
  return (
    <div className="skeleton-loader slider">
        <div className="slider-container">
          {[...Array(itemsCount)].map((_, index) => (
            <div key={index} className="skeleton-slider-item">
              <div className="skeleton-slider__image skeleton__image"></div>
              <div className="skeleton-slider__text skeleton__text"></div>
            </div>
          ))}
        </div>
    </div>
  );
}
