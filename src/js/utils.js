import { API } from './api.js';

export const insertHTML = (el, html) => el.insertAdjacentHTML('afterbegin', html);

// Replace html and insert another
export const replaceHTML = (el, html) => {
  el.replaceChildren();
  insertHTML(el, html);
};

// Get the url hash
export const getURLHash = () => document.location.hash;
// Select an element from html
export const $ = (element = document, selector) => element.querySelector(selector);

// Get the data from the API
export function getDataInJson(url, params = {}) {
  return API.get(url, {
    params
  })
    .then(({ data }) => data)
    .catch(err => console.log(err));
}

// Return the data from the API call
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

// Render some page according to the hash changing
export async function render(templateId, callback) {
  const htmlTemplate = $(document, templateId);
  const html = htmlTemplate.content.cloneNode(true);
  const app = document.querySelector('#app');
  app.replaceChildren();
  app.appendChild(html);

  callback();
}

// Load a default image
export function loadDefaultImage(e, defaultImg) {
  const defualtImages = {
    imgPerson: 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg',
    imgMovie: 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
  };

  e.target.onerror = null;
  e.target.src = defualtImages[defaultImg];
  e.target.removeEventListener('error', loadDefaultImage);
}

export function scrollToLeft(carousel, scrollPerItem) {
  carousel.scrollTo({
    top: 0,
    left: (carousel.scrollLeft - scrollPerItem),
    behavior: 'smooth'
  });
}

export function scrollToRight(carousel, scrollPerItem) {
  carousel.scrollTo({
    top: 0,
    left: (carousel.scrollLeft + scrollPerItem),
    behavior: 'smooth'
  });
}
