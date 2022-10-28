import { API } from './api.js';

export const insertHTML = (el, html) => el.insertAdjacentHTML('afterbegin', html);

export const replaceHTML = (el, html) => {
  el.replaceChildren();
  insertHTML(el, html);
};

export const getURLHash = () => document.location.hash;

export const $ = (element = document, selector) => element.querySelector(selector);

export function getDataInJson(url) {
  return API.get(url)
    .then(({ data }) => data)
    .catch(err => console.log(err));
}

export async function getListResults(urlName) {
  const { url, prop } = getUrl(urlName);
  const response = await getDataInJson(url);
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
    }
  };
  return urlsApi[label];
};

export async function render(templateId, callback) {
  const htmlTemplate = $(document, templateId);
  const html = htmlTemplate.content.cloneNode(true);
  document.body.replaceChildren();
  document.body.appendChild(html);

  callback();
}
