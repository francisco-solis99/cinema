import { createMovieCard, renderListResults } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#upcoming__view', () => {
    renderListResults({
      htmlSelectorSection: '.upcoming__movies',
      callbackRender: createMovieCard,
      urlInfo: 'upcomingMovies'
    });
  });
  await import('../styles/pages/movies-list.scss');
}
