import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#trendings__view', () => {
    renderListResults({
      htmlSelectorSection: '.trending__movies',
      callbackRender: createMovieCard,
      urlInfo: 'trendingMovies'
    });
  });

  addBackButton('.button__back');
  await import('../styles/pages/movies-list.scss');
}
