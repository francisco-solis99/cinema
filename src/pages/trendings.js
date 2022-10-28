import { createMovieCard, renderListResults } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#trendings__view', () => {
    renderListResults({
      htmlSelectorSection: '.trending__movies',
      callbackRender: createMovieCard,
      urlName: 'trendingMovies'
    });
  });
  await import('../styles/pages/movies-list.scss');
}
