import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  const indexEqualSymbol = location.hash.indexOf('=');
  const [idCategory, nameCategory] = location.hash.slice(indexEqualSymbol + 1).split('-');

  render('#movies-list__view', () => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: createMovieCard,
      urlInfo: {
        name: 'moviesCategory',
        params: {
          with_genres: idCategory
        }
      }
    });
  });

  const categoryTitle = document.querySelector('.view__list-subtitle');
  categoryTitle.classList.remove('skeleton');
  categoryTitle.classList.remove('skeleton-title');
  categoryTitle.textContent = decodeURI(nameCategory); // decode the url to avoid strange characters
  addBackButton('.button__back');
  await import('../styles/pages/movies-list.scss');
}
