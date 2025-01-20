import {
  renderBestTrendingMovie,
  renderListResults,
  createMovieCard,
  createPersonCard,
  createGenres,
  addCarouselMovement,
  renderLikedMovies
} from '../js/dom.js';

import { getItemFromLocalStorage } from '../js/utils.js';

export default function() {
  // Render init functions
  renderBestTrendingMovie();

  const likedMovies = getItemFromLocalStorage('cinema-liked');

  // render the trending movies
  renderListResults({
    htmlSelectorSection: '.section__tendencies .movies__cards',
    callbackRender: (item) => createMovieCard({ movie: item, lazy: true, isLiked: Boolean(likedMovies[item.id]) }),
    urlInfo: {
      name: 'trendingMovies',
      propertyPath: 'results'
    },
    numItems: 10
  });
  // render the now playing movies
  renderListResults({
    htmlSelectorSection: '.section__play-now .movies__cards',
    callbackRender: (item) => createMovieCard({ movie: item, lazy: true, isLiked: Boolean(likedMovies[item.id]) }),
    urlInfo: {
      name: 'nowPlayingMovies',
      propertyPath: 'results'
    },
    numItems: 10
  });
  // render the upcoming movies
  renderListResults({
    htmlSelectorSection: '.section__upcoming .movies__cards',
    callbackRender: (item) => createMovieCard({ movie: item, lazy: true, isLiked: Boolean(likedMovies[item.id]) }),
    urlInfo: {
      name: 'upcomingMovies',
      propertyPath: 'results'
    },
    numItems: 10
  });

  // render the people
  renderListResults({
    htmlSelectorSection: '.section__people .people__cards',
    callbackRender: (item) => createPersonCard({ person: item, lazy: false }),
    urlInfo: {
      name: 'trendingPeople',
      propertyPath: 'results'
    },
    numItems: 10
  });

  // Render the categories
  renderListResults({
    htmlSelectorSection: '.section__categories .categories__items',
    callbackRender: createGenres,
    urlInfo: {
      name: 'categoriesMovies',
      propertyPath: 'genres'
    },
    numItems: 15
  });

  // Render the movies liked
  renderLikedMovies({ htmlSelectorSection: '.section__liked .movies__cards' });
  // ----------------------------- Events and interactions ---------------------------------

  // Carousels
  addCarouselMovement();

  // Buttons see more home and go back
  const buttonsHome = document.querySelectorAll('.button__primary');
  buttonsHome.forEach(btn => {
    const hash = btn.dataset.btnmore;
    btn.addEventListener('click', () => {
      location.hash = `#${hash}`;
      // window.history.pushState({}, null, `#${hash}`);
    });
  });

  const searchButton = document.querySelector('.searcher__button');
  const searchInput = document.querySelector('.searcher__input');
  searchButton.addEventListener('click', () => searchMovie(searchInput.value));
  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    searchMovie(searchInput.value);
  });
}

function searchMovie(searchText) {
  location.hash = `#search=${searchText}`;
}
