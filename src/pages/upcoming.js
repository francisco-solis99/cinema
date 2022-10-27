import { $, createMovieCard, renderListResults } from '../js/utils.js';

export default async function() {
  const htmlTemplate = $(document, '#upcoming__view');
  const html = htmlTemplate.content.cloneNode(true);
  document.body.replaceChildren();
  document.body.appendChild(html);

  renderListResults({
    htmlSelectorSection: '.upcoming__movies',
    callbackRender: createMovieCard,
    urlName: 'upcomingMovies'
  });

  await import('../styles/pages/trendings.scss');
}
