import { useNavigate } from 'react-router-dom';
import '../stylesheets/HeroSection.css'

export default function Billboard({ featuredItems }: { featuredItems: any }) {

  const navigate = useNavigate();
  
  return (
    <>
      <div className="billboard">
        {featuredItems.items.map((item: any) => (
          <div key={item.id} className="billboard__wrapper">
            <img className="billboard__img" src={item.thumbnail} alt={item.title} fetchPriority="high" />
            <div className="billboard-info">
              <section className="heroText">
                <p className="overTheCast">{featuredItems.name}</p>
                <h1 className="title">
                  {item.title}
                </h1>
                <p className="description">
                  {item.description}
                </p>
                <div className="buttonContainer">
                  <button className="playButton" onClick={() => navigate(`/video/${item.id}`)}>
                    <div className="buttonContent">
                      <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/14cbc9fa2bde0c32119ef4f974864c7976ed73febe467cbb2ddea80c0d23519b?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="playIcon" />
                      <span className="buttonText">Reproduzir agora</span>
                    </div>
                  </button>
                </div>
                <div className="loadingBanners">
                  <div className="loadingBanner loadingBannerActive" />
                  <div className="loadingBanner" />
                  <div className="loadingBanner" />
                  <div className="loadingBanner" />
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
