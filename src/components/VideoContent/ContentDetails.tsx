import React from 'react';
import './VideoContent.css';

interface ContentDetailsProps {
  title: string;
  category: string;
  date: string;
  summary: string;
  complementaryFiles: Array<{ name: string, url: string }> | undefined; // Permite que seja undefined
  text: string;
  audioSrc: string;
  videoId: string;
  likes: number; // Passa o número de likes como prop
  onLike: () => Promise<void>; // Função para curtir o vídeo
  onDislike: () => Promise<void>; // Função para descurtir o vídeo
}

const ContentDetails: React.FC<ContentDetailsProps> = ({
  title,
  category,
  date,
  summary,
  complementaryFiles = [], // Define um valor padrão como array vazia
  text,
  audioSrc,
  videoId,
  likes,
  onLike,
  onDislike,
}) => {
  return (
    <section className="contentDetails">
      <h1 className="contentVideoTitle">{title}</h1>
      <div className="contentMeta">
        <span className="category">{category}</span>
        <span className="date">{new Date(date).toLocaleDateString()}</span>
        <button className="addToListButton">
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/943303720652841a42bad06d95afde64a2c9321977de811a6caececfaf662e6d?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="addIcon" />
          Adicionar à minha lista
        </button>
        <button className="likeButton" onClick={onLike}>
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/388f3056dcad30fd281389cedc13af70e2199e0305b80e9aaf57d95eefb6f44f?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="likeIcon" />
          Gostei ({likes})
        </button>
        <button className="dislikeButton" onClick={onDislike}>
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/ae6a4fec601a01d7e708a9b923e09c4af2896e995bebc97203313b5556e95cf9?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="dislikeIcon" />
          Não é pra mim
        </button>
        <button className="shareButton">
          <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/0ed93ea8139dc612e0094ed833ce3347674523ed735b07bb3860626f301c413e?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="shareIcon" />
          Compartilhar
        </button>
      </div>
      <h2 className="summaryTitle">Resumo</h2>
      <p className="summaryText">{summary}</p>
      <h2 className="filesTitle">Arquivos complementares</h2>
      <div className="complementaryFiles">
        {complementaryFiles.length > 0 ? (
          complementaryFiles.map((file, index) => (
            <a key={index} href={file.url} className="fileLink" download>
              {file.name}
              <img src="https://cdn.builder.io/api/v1/image/assets/0c364b68c1644e14b12786de4095f82b/902c0c3da3272e12c617f902fa60b810fc33270976ad5f5dd7dae98e3c5e6e4e?apiKey=0c364b68c1644e14b12786de4095f82b&" alt="" className="downloadIcon" />
            </a>
          ))
        ) : (
          <p>Nenhum arquivo complementar disponível.</p> // Mensagem se não houver arquivos
        )}
      </div>
      <h2 className="textTitle">Texto</h2>
      <p className="contentText">{text}</p>
      <h2 className="audioTitle">Áudio</h2>
      <audio src={audioSrc} controls className="audioPlayerVideo">
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </section>
  );
};

export default ContentDetails;
