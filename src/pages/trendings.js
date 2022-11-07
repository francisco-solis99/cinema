import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: createMovieCard,
      urlInfo: 'trendingMovies'
    });
  });

  addBackButton('.button__back');
  await import('../styles/pages/movies-list.scss');
}
