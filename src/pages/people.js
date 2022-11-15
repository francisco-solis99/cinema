import { createPersonCard, renderListResults, addBackButton } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#people__view', () => {
    renderListResults({
      htmlSelectorSection: '.people__actors',
      callbackRender: createPersonCard,
      urlInfo: 'trendingPeople'
    });
  });
  addBackButton('.button__back');
  await import('../styles/pages/people-list.scss');
}
