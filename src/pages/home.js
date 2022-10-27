import {
  renderBestTrendingMovie,
  renderListResults,
  createMovieCard,
  createPersonCard,
  createGenres
} from '../js/utils.js';

export default function(initialContent) {
  // Render init functions
  renderBestTrendingMovie();
  // render the trending movies
  renderListResults({
    htmlSelectorSection: '.section__tendencies .movies__cards',
    callbackRender: createMovieCard,
    urlName: 'trendingMovies',
    numItems: 10
  });
  // render the now playing movies
  renderListResults({
    htmlSelectorSection: '.section__play-now .movies__cards',
    callbackRender: createMovieCard,
    urlName: 'nowPlayingMovies',
    numItems: 10
  });
  // render the upcoming movies
  renderListResults({
    htmlSelectorSection: '.section__upcoming .movies__cards',
    callbackRender: createMovieCard,
    urlName: 'upcomingMovies',
    numItems: 10
  });

  // render the people
  renderListResults({
    htmlSelectorSection: '.section__people .people__cards',
    callbackRender: createPersonCard,
    urlName: 'trendingPeople',
    numItems: 10

  });

  // Render the categories
  renderListResults({
    htmlSelectorSection: '.section__categories .categories__items',
    callbackRender: createGenres,
    urlName: 'categoriesMovies',
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
