import { createMovieCard, renderListResults } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  const indexEqualSymbol = location.hash.indexOf('=');
  const [idCategory, nameCategory] = location.hash.slice(indexEqualSymbol + 1).split('-');

  render('#category__view', () => {
    renderListResults({
      htmlSelectorSection: '.category__movies',
      callbackRender: createMovieCard,
      urlInfo: {
        name: 'moviesCategory',
        params: {
          with_genres: idCategory
        }
      }
    });
  });
  await import('../styles/pages/movies-list.scss');

  const categoryTitle = document.querySelector('.view__list-subtitle');
  categoryTitle.textContent = decodeURI(nameCategory); // decode the url to avoid strange characters
}
