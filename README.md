# Área de Membros com React

## Descrição do Projeto
Este projeto é uma aplicação de área de membros desenvolvida em React que exibe vídeos organizados por categoria e permite a reprodução de vídeos usando HLS. A aplicação simula chamadas de API utilizando `json-server` e inclui animações e skeletons para uma experiência de usuário aprimorada.

## Funcionalidades
- **Página Inicial (Home Screen):** Lista de vídeos obtidos de uma API simulada utilizando json-server, organizados por categoria.
- **Detalhes do Vídeo (Video Detail Screen):** Reprodução de vídeos usando HLS, exibição de informações sobre o vídeo (título, descrição, views, likes), com opções para incrementar likes e views.
- **Skeleton Loading:** Exibição de skeletons enquanto os dados estão sendo carregados.
- **Animações:** Transições entre telas e animação de exibição dos vídeos na página inicial.
  
## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção da interface.
- **json-server**: Simula uma API para fornecimento de dados.
- **HLS (HTTP Live Streaming)**: Para reprodução de vídeos.
- **Bibliotecas de Animação**: Para transições e animações no carregamento dos componentes.
- **React Content Loader**: Para skeleton loaders.
- **React Router**: Para navegação entre páginas.
- **Jest**: Para testes funcionais.

## Instalação

### Pré-requisitos
- Node.js instalado na sua máquina.
- Editor de código como VSCode (opcional, mas recomendado).

### Passo a Passo

1. **Clone o Repositório**
   ```bash
   https://github.com/lucasroncolato/Teste-NetShow.me.git
   cd area-de-membros-react
Instale as Dependências Execute o comando abaixo para instalar as dependências do projeto.


npm install
Configuração do json-server O json-server será utilizado para simular a API. Você deve criar um arquivo db.json ou usar o fornecido para simular o banco de dados.

Inicie o json-server com o comando:


npx json-server --watch db.json --port 3000
O servidor será iniciado em http://localhost:3000/, com os seguintes endpoints:

GET /videos - Lista todos os vídeos.
GET /videos/:id - Retorna os detalhes de um vídeo específico.
PATCH /videos/:id - Atualiza likes e views de um vídeo específico.
Execute o Projeto Após instalar as dependências e configurar o json-server, inicie o projeto React:


npm start
O aplicativo estará disponível em http://localhost:5173.

Estrutura do Projeto
src/components: Componentes reutilizáveis da aplicação.
src/pages: Páginas principais da aplicação (Home Screen e Video Detail Screen).
src/services: Serviços para integração com a API (json-server).
src/styles: Arquivos de estilos globais e dos componentes.
db.json: Arquivo que contém os dados de vídeos para o json-server.
Requisitos e Implementação
Home Screen
Exibe a lista de vídeos por categoria com thumbnail e título.
Navegação para a tela de detalhes ao clicar em um item.
Video Detail Screen
Reproduz o vídeo em HLS e exibe título, descrição, views e likes.
Permite incrementar likes e views do vídeo.
Skeleton Loading
Exibe skeletons para os componentes enquanto os dados estão sendo carregados.
Animações
Animações de transição entre as telas e ao exibir vídeos na Home Screen.
API com json-server
A aplicação utiliza a json-server para simular a API. Configure conforme descrito na seção de instalação.

Testes
Para rodar os testes funcionais da aplicação:


npm test
SSR (Server-Side Rendering)
A versão SSR é gerada para melhorar a performance e a indexação de conteúdo.

Recursos Adicionais
Documentação do json-server
jwplayer e bitmovin para reprodução de vídeos HLS.
Conclusão
Esse projeto foi desenvolvido para demonstrar habilidades em React, navegação, integração com APIs, skeleton loading, animações e testes.