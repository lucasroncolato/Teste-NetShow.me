// SkeletonLoader.tsx
import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader: React.FC = () => (
  <ContentLoader
    speed={2}
    width={924}
    height={700}
    viewBox="0 0 924 700"
    backgroundColor="#1e1e1e"
    foregroundColor="#444">
    {/* Skeleton para o player de vídeo */}
    <rect x="0" y="0" rx="4" ry="4" width="924" height="520" />
    
    {/* Skeleton para os detalhes do conteúdo */}
    <rect x="20" y="540" rx="4" ry="4" width="200" height="24" />
    <rect x="20" y="580" rx="4" ry="4" width="150" height="20" />
    <rect x="20" y="610" rx="4" ry="4" width="600" height="40" />
    
    {/* Skeleton para a seção de arquivos complementares */}
    <rect x="20" y="670" rx="4" ry="4" width="200" height="24" />
    
    {/* Skeleton para o conteúdo relacionado */}
    <rect x="0" y="720" rx="4" ry="4" width="924" height="40" />
  </ContentLoader>
);

export default SkeletonLoader;
