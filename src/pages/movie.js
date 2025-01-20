import {
  renderMovieView,
  addBackButton,
  renderListResults,
  createMovieCard,
  createCastCard,
  createProvider,
  createReview,
  // renderGallery,
  addCarouselMovement
} from '../js/dom.js';

import { render } from '../js/utils.js';

export default async function() {
  // Bring the styles
  await import('../styles/pages/movie-details.scss');

  // get the movie id
  const [, idMovie] = location.hash.split('=');
  render('#movie-details-view', () => {
    // Render the movie info
    renderMovieView({
      htmlSelector: '.movie__details',
      urlInfo: [{
        name: 'movie',
        subpath: `/${idMovie}`
      },
      {
        name: 'movie',
        subpath: `/${idMovie}/credits`
      }
      ]
    });

    // render providers
    renderListResults({
      htmlSelectorSection: '.movie__providers .providers__list',
      callbackRender: (item) => createProvider({ provider: item }),
      urlInfo: {
        name: 'movie',
        subpath: `/${idMovie}/watch/providers`,
        propertyPath: ['results', 'US', 'buy']
      }
    });

    // Render the cast
    renderListResults({
      htmlSelectorSection: '.cast__persons',
      callbackRender: createCastCard,
      urlInfo: {
        name: 'cast',
        subpath: `/${idMovie}/credits`,
        propertyPath: 'cast'
      },
      numItems: 5
    });

    // Render the gallery
    // renderGallery({
    //   htmlSelectorSection: '.movie__gallery',
    //   urlInfo: {
    //     name: 'movie',
    //     subpath: `/${idMovie}/images`
    //   }
    // });

    // render reviews
    renderListResults({
      htmlSelectorSection: '.movie__reviews .reviews__list',
      callbackRender: (item) => createReview({ review: item }),
      urlInfo: {
        name: 'movie',
        subpath: `/${idMovie}/reviews`,
        propertyPath: ['results']
      },
      numItems: 3
    });

    // render the similar movies
    renderListResults({
      htmlSelectorSection: '.similar__movies',
      callbackRender: (item) => createMovieCard({ movie: item, lazy: true }),
      urlInfo: {
        name: 'similarMovies',
        subpath: `/${idMovie}/recommendations`,
        propertyPath: 'results'
      },
      numItems: 10
    });
  });
  // Add the carousel interaction and the back button
  addBackButton('.button__back');
  addCarouselMovement();
}
