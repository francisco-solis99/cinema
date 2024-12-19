import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  // Bring the category styles
  await import('../styles/pages/movies-list.scss');

  // get the category
  const indexEqualSymbol = location.hash.indexOf('=');
  const [idCategory, nameCategory] = location.hash.slice(indexEqualSymbol + 1).split('-');

  // Render the movies of the category
  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: {
        name: 'moviesCategory',
        params: {
          with_genres: idCategory
        }
      }
    });
  });

  // Remove skeleton css clasess
  const categoryTitle = document.querySelector('.view__list-subtitle');
  categoryTitle.classList.remove('skeleton');
  categoryTitle.classList.remove('skeleton-title');
  categoryTitle.textContent = decodeURI(nameCategory); // decode the url to avoid strange characters

  // Add the back button
  addBackButton('.button__back');
}
