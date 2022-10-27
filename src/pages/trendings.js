import { $, createMovieCard, renderListResults } from '../js/utils.js';

export default async function() {
  const htmlTemplate = $(document, '#trendings__view');
  const html = htmlTemplate.content.cloneNode(true);
  document.body.replaceChildren();
  document.body.appendChild(html);

  renderListResults({
    htmlSelectorSection: '.trending__movies',
    callbackRender: createMovieCard,
    urlName: 'trendingMovies'
  });

  await import('../styles/pages/trendings.scss');
}
