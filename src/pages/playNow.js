import { createMovieCard, renderListResults } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#playing__view', () => {
    renderListResults({
      htmlSelectorSection: '.play-now__movies',
      callbackRender: createMovieCard,
      urlInfo: 'nowPlayingMovies'
    });
  });
  await import('../styles/pages/movies-list.scss');
}
