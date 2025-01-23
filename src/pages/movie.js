import {
  renderMovieView,
  addBackButton,
  renderListResults,
  createMovieCard,
  createCastCard,
  createProvider,
  createReview,
  // renderGallery,
  addCarouselMovement,
  renderTranslation,
  setHandleLanguage
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
    }).then(() => {
      renderTranslation({ htmlSelector: '.movie__resume-title', view: '/movie', section: 'overview' });
    });

    // Render the translations
    const translations = [
      ['.movie__providers .section__title', 'providers'],
      ['.movie__cast .section__title', 'cast'],
      ['.movie__reviews .section__title', 'reviews'],
      ['.movie__similars .section__title', 'similar']
    ];

    translations.forEach(translation => renderTranslation({ htmlSelector: translation[0], view: '/movie', section: translation[1] }));

    // Language
    setHandleLanguage();

    // render providers
    renderListResults({
      htmlSelectorSection: '.movie__providers .providers__list',
      callbackRender: (item) => createProvider({ provider: item }),
      urlInfo: {
        name: 'movie',
        subpath: `/${idMovie}/watch/providers`,
        propertyPath: ['results', 'US', 'buy']
      }
    }).then(data => {
      const { results } = data;
      const dataArr = results?.US?.buy ?? [];
      if (Object.keys(dataArr).length === 0) {
        const sectionToRemove = document.querySelector('.movie__providers');
        sectionToRemove.remove();
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
    }).then(data => {
      const { cast } = data;
      if (Object.keys(cast).length === 0) {
        const sectionToRemove = document.querySelector('.movie__cast');
        sectionToRemove.remove();
      }
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
    }).then(data => {
      const { results } = data;
      if (Object.keys(results).length === 0) {
        const sectionToRemove = document.querySelector('.movie__reviews');
        sectionToRemove.remove();
      }
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
