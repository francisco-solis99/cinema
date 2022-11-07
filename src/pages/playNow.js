import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: createMovieCard,
      urlInfo: 'nowPlayingMovies'
    });
  });

  const titlePage = document.querySelector('.view__list-subtitle');
  titlePage.textContent = 'Play now movies';
  addBackButton('.button__back');
  await import('../styles/pages/movies-list.scss');
}
