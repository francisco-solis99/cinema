import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  // Bring the styles
  await import('../styles/pages/movies-list.scss');

  // Render the playNow movies
  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: 'nowPlayingMovies'
    });
  });

  const titlePage = document.querySelector('.view__list-subtitle');
  titlePage.textContent = 'Play now movies';
  // add the back button
  addBackButton('.button__back');
}
