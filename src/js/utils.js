import { API } from './api.js';

export const insertHTML = (el, html) => el.insertAdjacentHTML('afterbegin', html);

export const replaceHTML = (el, html) => {
  el.replaceChildren();
  insertHTML(el, html);
};

export const getURLHash = () => document.location.hash;

export const $ = (element = document, selector) => element.querySelector(selector);

export function getDataInJson(url, params = {}) {
  return API.get(url, {
    params
  })
    .then(({ data }) => data)
    .catch(err => console.log(err));
}

export async function getListResults(urlInfo) {
  const isObject = typeof urlInfo === 'object';

  const { url, prop } = getUrl(isObject ? urlInfo.name : urlInfo);
  const response = await getDataInJson(url, urlInfo.params);
  return response[prop];
}

// Get the API url
export function getUrl(label) {
  const urlsApi = {
    trendingMovies: {
      url: '/trending/movie/week',
      prop: 'results'
    },
    upcomingMovies: {
      url: '/movie/upcoming',
      prop: 'results'
    },

    nowPlayingMovies: {
      url: '/movie/now_playing',
      prop: 'results'
    },
    trendingPeople: {
      url: '/person/popular',
      prop: 'results'
    },
    categoriesMovies: {
      url: '/genre/movie/list',
      prop: 'genres'
    },
    moviesCategory: {
      url: '/discover/movie',
      prop: 'results'
    },
    searchMovies: {
      url: '/search/movie',
      prop: 'results'
    }
  };
  return urlsApi[label];
};

export async function render(templateId, callback) {
  const htmlTemplate = $(document, templateId);
  const html = htmlTemplate.content.cloneNode(true);
  const app = document.querySelector('#app');
  app.replaceChildren();
  app.appendChild(html);

  callback();
}

// Load a defualt image
export function loadDefaultImage(e) {
  const defualtImages = {
    imagePerson: 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
  };

  e.target.onerror = null;
  e.target.src = defualtImages.imagePerson;
  e.target.removeEventListener('error', loadDefaultImage);
}
