import './styles/styles.scss';
import { API } from './js/key.js';

// Render the most tendencie movie

function getDataInJson(url) {
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}
async function getMovies(urlName) {
  const urlMovies = getUrl(urlName);
  const { results: moviesList } = await getDataInJson(urlMovies);
  return moviesList;
}

async function renderBestTrendingMovie() {
  const header = document.querySelector('.header');
  const [bestTrendingMovie] = await getMovies('trendingMovies');
  header.style.backgroundImage = `linear-gradient(to bottom, rgba(45, 41, 64, 0.45), rgba(13, 23, 53, 1)), url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${bestTrendingMovie.backdrop_path}')`;
  header.querySelector('.best__movie-title').textContent = bestTrendingMovie.title;
}

async function renderMovies({ htmlSelectorSection, callbackGetMovies, urlName }) {
  const section = document.querySelector(htmlSelectorSection);
  const tendenciesMovies = await callbackGetMovies(urlName);
  const fragment = document.createDocumentFragment();

  tendenciesMovies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    fragment.append(movieCard);
  });

  section.appendChild(fragment);
}

function createMovieCard(movie) {
  const { poster_path: posterPath, title: movieName, id } = movie;
  const posterUrl = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${posterPath}`;
  const card = document.createElement('arcticle');
  card.dataset.movieId = id;
  card.classList.add('movie__card');
  card.innerHTML = `
    <figure class="card__poster-wrapper">
      <img src="${posterUrl}" alt="Poster - ${movieName}" class="card__poster">
    </figure>
  `;
  return card;
}

function getUrl(label) {
  const urlsApi = {
    trendingMovies: `${API.base}${API.trending}/movie/week?api_key=${API.key}`,
    upcomingMovies: `${API.base}/movie/upcoming?api_key=${API.key}`,
    nowPlayingMovies: `${API.base}/movie/now_playing?api_key=${API.key}`
  };
  return urlsApi[label];
}
renderBestTrendingMovie();
renderMovies({ htmlSelectorSection: '.section__tendencies .movies__cards', callbackGetMovies: getMovies, urlName: 'trendingMovies' });
renderMovies({ htmlSelectorSection: '.section__play-now .movies__cards', callbackGetMovies: getMovies, urlName: 'nowPlayingMovies' });
renderMovies({ htmlSelectorSection: '.section__upcoming .movies__cards', callbackGetMovies: getMovies, urlName: 'upcomingMovies' });
