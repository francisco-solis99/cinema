import { createMovieCard, renderListResults, addBackButton, renderNoMoreResults } from '../js/dom.js';
import { render, addIntersectionObserverToLoadMore } from '../js/utils.js';

export default async function() {
  // Bring the styles for this view
  await import('../styles/pages/movies-list.scss');

  // Render the trending movies
  render('#movies-list__view', async() => {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: {
        name: 'trendingMovies',
        propertyPath: 'results'
      }
    }).then(data => {
      // Then add the load more once the first render is set

      // Intersection observer for load more
      const footer = document.querySelector('.footer');
      const renderMoreResultsFn = renderMoreResultsCb();
      addIntersectionObserverToLoadMore({
        callbackIntersecting: renderMoreResultsFn,
        callbackEndIntersecting: () => renderNoMoreResults({ htmlSelectorSection: '.movies__list' }),
        elementToObserve: footer,
        maxPage: data.total_pages
      });
    });
  });

  // Add the back button
  addBackButton('.button__back');
}

function renderMoreResultsCb() {
  return function(page) {
    renderListResults({
      htmlSelectorSection: '.movies__list',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: {
        name: 'trendingMovies',
        params: {
          page
        },
        propertyPath: 'results'
      },
      toClean: false
    });
  };
}
