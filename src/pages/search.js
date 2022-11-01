import { createMovieCard, renderListResults } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  const [, query] = location.hash.split('=');

  render('#searcher__view', () => {
    renderListResults({
      htmlSelectorSection: '.filter__movies',
      callbackRender: createMovieCard,
      urlInfo: {
        name: 'searchMovies',
        params: {
          query
        }
      }
    });
  });

  const resultsText = document.querySelector('.search__result-text');
  resultsText.textContent = `Results for "${decodeURI(query)}"`; // decode the url to avoid strange characters

  const searchButton = document.querySelector('.searcher__button');
  const searchInput = document.querySelector('.searcher__input');
  searchButton.addEventListener('click', () => searchMovie(searchInput.value));
  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    searchMovie(searchInput.value);
  });

  await import('../styles/pages/search.scss');
}

function searchMovie(searchText) {
  location.hash = `#search=${searchText}`;
}
