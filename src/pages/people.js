import { createPersonCard, renderListResults } from '../js/dom.js';
import { render } from '../js/utils.js';

export default async function() {
  render('#people__view', () => {
    renderListResults({
      htmlSelectorSection: '.people__actors',
      callbackRender: createPersonCard,
      urlInfo: 'trendingPeople'
    });
  });
  await import('../styles/pages/people-list.scss');
}
