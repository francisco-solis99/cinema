import './styles/styles.scss';
import { API } from './js/api.js';

function getDataInJson(url) {
  return API.get(url)
    .then(({ data }) => data)
    .catch(err => console.log(err));
}

async function getListResults(urlName) {
  const { url, prop } = getUrl(urlName);
  const response = await getDataInJson(url);
  return response[prop];
}

// Render the most tendencie movie
async function renderBestTrendingMovie() {
  const header = document.querySelector('.header');
  const [bestTrendingMovie] = await getListResults('trendingMovies');
  header.style.backgroundImage = `linear-gradient(to bottom, rgba(45, 41, 64, 0.45), rgba(13, 23, 53, 1)), url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${bestTrendingMovie.backdrop_path}')`;
  header.querySelector('.best__movie-title').textContent = bestTrendingMovie.title;
}

// Render the list results
async function renderListResults({ htmlSelectorSection, urlName, callbackRender, numItems }) {
  const section = document.querySelector(htmlSelectorSection);
  const list = await getListResults(urlName);
  const fragment = document.createDocumentFragment();

  list.slice(0, numItems ?? list.lenght).forEach(item => {
    const element = callbackRender(item);
    fragment.append(element);
  });

  section.appendChild(fragment);
}

// Create a movie card with some of teh movie information
function createMovieCard(movie) {
  const { poster_path: posterPath, title: movieName, release_date: date, vote_average: score, id } = movie;
  const posterUrl = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${posterPath}`;
  const card = document.createElement('arcticle');
  card.dataset.movieId = id;
  card.classList.add('movie__card');
  card.innerHTML = `
    <figure class="card__poster-wrapper">
      <img src="${posterUrl}" alt="Poster - ${movieName}" class="card__poster">
      <figcaption class="card__caption">
        <h3 class="card__movie-title">${movieName}</h4>
        <span>
          <svg width="15" height="15" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.192 8.45108L16.6975 7.35612L13.3472 0.528203C13.2557 0.341259 13.1052 0.189923 12.9192 0.0979342C12.4528 -0.133521 11.8861 0.0593584 11.6529 0.528203L8.30266 7.35612L0.808145 8.45108C0.601522 8.48076 0.41261 8.57868 0.267974 8.72705C0.0931164 8.90772 -0.00323781 9.15079 8.308e-05 9.40284C0.00340397 9.6549 0.106128 9.89531 0.285684 10.0713L5.70806 15.3858L4.427 22.8903C4.39696 23.0649 4.41618 23.2444 4.48247 23.4086C4.54877 23.5727 4.65949 23.7149 4.80208 23.819C4.94467 23.9231 5.11342 23.985 5.28921 23.9976C5.46499 24.0102 5.64077 23.973 5.79662 23.8903L12.5001 20.3473L19.2035 23.8903C19.3865 23.9882 19.599 24.0209 19.8027 23.9853C20.3163 23.8962 20.6617 23.4066 20.5731 22.8903L19.2921 15.3858L24.7144 10.0713C24.862 9.92587 24.9594 9.73595 24.9889 9.52824C25.0686 9.00895 24.7085 8.52823 24.192 8.45108V8.45108Z" fill="#FFB608"/>
          </svg>
        </span>
        <span>${Math.round(score)}</span>
        <span>|</span>
        <span>${date}</span>
      </figcaption>
    </figure>
  `;
  return card;
}

// Create person card
function createPersonCard(person) {
  const { name, profile_path: profilePath } = person;
  const personCard = document.createElement('arcticle');
  // card.dataset.movieId = id;
  personCard.classList.add('person__card');
  personCard.innerHTML = `
    <figure class="card__person-wrapper">
      <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profilePath}" alt="Actor Photo - ${name}" class="card__person-img">
    </figure>
    <div class="overlay">
      <h4 class="card__person-name">${name}</h4>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>
  `;
  return personCard;
}

function createGenres(genre) {
  const { name, id } = genre;
  const nameCssVariable = name.toLowerCase().replace(' ', '-');
  const colorCategory = getComputedStyle(document.body).getPropertyValue(`--color-genre-${nameCssVariable}`);
  const categoryElement = document.createElement('div');
  categoryElement.classList.add('category__item', `category__item-${id}}`);
  categoryElement.innerHTML = `
    <a href="/" class="category__name">
      <span class="category__square" style="background-color:${colorCategory}"></span>
      <span>${name}</span>
    </a>
  `;
  return categoryElement;
}

// Get the API url
function getUrl(label) {
  const urlsApi = {
    trendingMovies: {
      url: '/trending/movie/week',
      prop: 'results'
    },
    upcomingMovies: {
      url: '/movie/upcoming',
      prop: 'results'
    },

    nowPlayingMovies: {
      url: '/movie/now_playing',
      prop: 'results'
    },
    trendingPeople: {
      url: '/person/popular',
      prop: 'results'
    },
    categoriesMovies: {
      url: '/genre/movie/list',
      prop: 'genres'
    }
  };
  return urlsApi[label];
};

// Render init functions
renderBestTrendingMovie();
// render the trending movies
renderListResults({
  htmlSelectorSection: '.section__tendencies .movies__cards',
  callbackRender: createMovieCard,
  urlName: 'trendingMovies'
});
// render the now playing movies
renderListResults({
  htmlSelectorSection: '.section__play-now .movies__cards',
  callbackRender: createMovieCard,
  urlName: 'nowPlayingMovies'
});
// render the upcoming movies
renderListResults({
  htmlSelectorSection: '.section__upcoming .movies__cards',
  callbackRender: createMovieCard,
  urlName: 'upcomingMovies'
});

// render the people
renderListResults({
  htmlSelectorSection: '.section__people .people__cards',
  callbackRender: createPersonCard,
  urlName: 'trendingPeople'
});

// Render the categories
renderListResults({
  htmlSelectorSection: '.section__categories .categories__items',
  callbackRender: createGenres,
  urlName: 'categoriesMovies',
  numItems: 15
});

// console.log(getComputedStyle(document.body).getPropertyValue('--color-primary'));

// Axios test

// async function textAxios() {
//   try {
//     const { data } = await instance.get('/trending/movie/week');
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// textAxios();
