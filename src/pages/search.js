import { createMovieCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  // bribng the styles
  await import('../styles/pages/search.scss');

  // get the queries and decoded
  const [, query] = location.hash.split('=');
  const queryDecoded = decodeURI(query);

  // render the results of search
  render('#searcher__view', () => {
    renderListResults({
      htmlSelectorSection: '.filter__movies',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: {
        name: 'searchMovies',
        params: {
          query: queryDecoded
        }
      }
    });
  });

  // remove the skeleton css classes
  const resultsText = document.querySelector('.search__result-text');
  resultsText.classList.remove('skeleton');
  resultsText.classList.remove('skeleton-title');
  resultsText.textContent = `Results for "${queryDecoded}"`; // decode the url to avoid strange characters

  // Add the events to search a movie
  const searchButton = document.querySelector('.searcher__button');
  const searchInput = document.querySelector('.searcher__input');
  searchButton.addEventListener('click', () => searchMovie(searchInput.value));
  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    searchMovie(searchInput.value);
  });

  // Add the back button
  addBackButton('.button__back');
}

function searchMovie(searchText) {
  location.hash = `#search=${searchText}`;
}
