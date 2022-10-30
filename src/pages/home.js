import {
  renderBestTrendingMovie,
  renderListResults,
  createMovieCard,
  createPersonCard,
  createGenres
} from '../js/dom.js';

export default function() {
  // Render init functions
  renderBestTrendingMovie();
  // render the trending movies
  renderListResults({
    htmlSelectorSection: '.section__tendencies .movies__cards',
    callbackRender: createMovieCard,
    urlInfo: 'trendingMovies',
    numItems: 10
  });
  // render the now playing movies
  renderListResults({
    htmlSelectorSection: '.section__play-now .movies__cards',
    callbackRender: createMovieCard,
    urlInfo: 'nowPlayingMovies',
    numItems: 10
  });
  // render the upcoming movies
  renderListResults({
    htmlSelectorSection: '.section__upcoming .movies__cards',
    callbackRender: createMovieCard,
    urlInfo: 'upcomingMovies',
    numItems: 10
  });

  // render the people
  renderListResults({
    htmlSelectorSection: '.section__people .people__cards',
    callbackRender: createPersonCard,
    urlInfo: 'trendingPeople',
    numItems: 10

  });

  // Render the categories
  renderListResults({
    htmlSelectorSection: '.section__categories .categories__items',
    callbackRender: createGenres,
    urlInfo: 'categoriesMovies',
    numItems: 15
  });

  const buttonsHome = document.querySelectorAll('.button__primary');

  buttonsHome.forEach(btn => {
    const hash = btn.dataset.btnmore;
    btn.addEventListener('click', () => {
      location.hash = `#${hash}`;
      // window.history.pushState({}, null, `#${hash}`);
      // window.history.pushState({}, null, `#${hash}`);
    });
  });
}
