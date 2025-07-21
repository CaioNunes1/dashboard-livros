# Dashboard de Livros - OpenLibrary

## Visão Geral  
O **Dashboard de Livros** é uma aplicação React que consome a OpenLibrary API para permitir ao usuário:  
- **Buscar** títulos por termo, com paginação.  
- **Navegar** por uma lista de “livros populares” ao abrir a aplicação.  
- **Filtrar** resultados por faixa de ano, idioma e ordenar por título ou ano.  
- **Marcar** livros como favoritos (persistidos em `localStorage`).  
- **Visualizar** detalhes de cada obra em um modal.  
- **Exibir** um gráfico de barras mostrando a distribuição de publicações por década.  
- **UX aprimorada** com placeholder inicial, loading skeleton e paginação customizada.

## Tecnologias  
- **React 18.2.0**  
- **Material‑UI 5.x** (componentes e tema)  
- **Axios** para chamadas HTTP  
- **Recharts** para gráficos  
- **React Testing Library** + Jest para testes unitários  
- **Storybook** (opcional) para documentação de componentes  

Arquitetura de hooks: useBooks encapsula busca, debounce e paginação; useFavorites abstrai localStorage.

Componentização: cada UI (SearchBar, BookCard, Filters, PaginationControls, BookModal, DistributionChart, LoadingSkeleton) está isolada e documentada.

Material‑UI: adotado para acelerar desenvolvimento de layout responsivo, utilizando Box, Grid, Skeleton e Dialog.

Debounce: evita chamadas excessivas à API conforme o usuário digita.

Persistência de favoritos: simples lista de chaves em localStorage, sem backend.

Testes: cobertura básica de hooks e componentes críticos, garantindo regressões mínimas.

Gráfico: Recharts para visualização de dados, aproveitando ResponsiveContainer para mobile.

## Instalação  
```bash
git clone https://github.com/CaioNunes1/dashboard-livros.git
cd dashboard-livros-openlibrary
npm install
npm start

npm run dev — inicia o servidor de desenvolvimento (Vite).

npm test — executa Jest em modo watch.

npm run build — gera build de produção.

npm run storybook — inicia Storybook (se configurado).


