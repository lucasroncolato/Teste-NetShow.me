

import "../stylesheets/SkeletonLoaderSlider.css";

export default function SkeletonLoaderSlider() {
  return (
    <div className="billboard skeleton-loader">
      <div className="billboard__wrapper skeleton-background">
        <div className="billboard-info">
          <div className="billboard-info__logo skeleton-logo" />
          <div className="billboard-info__text skeleton-text" />
          <div className="billboard-info__links">
            <div className="billboard-info__btn skeleton-button" />
            <div className="billboard-info__btn skeleton-button" />
          </div>
        </div>
        <div className="billboard-sidebar">
          <span className="billboard-sidebar__maturity skeleton-maturity" />
        </div>
      </div>
    </div>
  );
}