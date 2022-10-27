import { $, createMovieCard, renderListResults } from '../js/utils.js';

export default async function() {
  const htmlTemplate = $(document, '#playing__view');
  const html = htmlTemplate.content.cloneNode(true);
  document.body.replaceChildren();
  document.body.appendChild(html);

  renderListResults({
    htmlSelectorSection: '.play-now__movies',
    callbackRender: createMovieCard,
    urlName: 'nowPlayingMovies'
  });

  await import('../styles/pages/trendings.scss');
}
