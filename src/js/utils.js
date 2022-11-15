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
  const { url, prop } = getUrl(urlInfo);
  const response = await getDataInJson(url, urlInfo.params);
  if (!prop) return response;
  return response[prop];
}

// Get the API url
export function getUrl(urlInfo) {
  const isObject = typeof urlInfo === 'object';
  const label = isObject ? urlInfo.name : urlInfo;

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
    },
    movie: {
      url: '/movie',
      prop: null
    },
    similarMovies: {
      url: '/movie',
      prop: 'results'
    },
    cast: {
      url: '/movie',
      prop: 'cast'
    }
  };

  if (urlInfo.subpath) {
    urlsApi[label].url = `${urlsApi[label].url}${urlInfo.subpath}`;
    return urlsApi[label];
  }

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
