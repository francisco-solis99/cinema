import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: createMovieCard,
      urlInfo: 'upcomingMovies'
    });
  });

  const titlePage = document.querySelector('.view__list-subtitle');
  titlePage.textContent = 'Upcoming movies';
  addBackButton('.button__back');
  await import('../styles/pages/movies-list.scss');
}
