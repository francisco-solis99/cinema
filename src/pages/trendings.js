import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  // Bring the styles for this view
  await import('../styles/pages/movies-list.scss');

  // Render the trending movies
  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: 'trendingMovies'
    });
  });

  // Add the back button
  addBackButton('.button__back');
}
