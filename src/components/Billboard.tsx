import { useNavigate } from 'react-router-dom';
import { PlayIcon } from '../Icons/Player';

export default function Billboard({ featuredItems }: { featuredItems: any }) {
  const navigate = useNavigate();
  return (
    <div className="billboard">
      <div key={`${featuredItems.id}`} className="billboard__wrapper">
        <img className="billboard__img" src={featuredItems.thumbnail} alt={featuredItems.title} />
        <div className="billboard-info">
          <section className="heroText">
            <p className="overTheCast">{featuredItems.name}</p>
            <h1 className="title">{featuredItems.title}</h1>
            <p className="description">{featuredItems.description}</p>
            <div className="buttonContainer">
              <button className="playButton" onClick={() => navigate(`/video/${featuredItems.id}`)}>
                <div className="buttonContent">
                  <span className="playIcon" ><PlayIcon size={24} color="black" /></span>
                  <span className="buttonText">Reproduzir agora</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
