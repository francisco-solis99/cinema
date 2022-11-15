
export const routes = [
  {
    name: 'home',
    hashStart: '',
    view: async() => await (await import('../pages/home.js')).default()
  },
  {
    name: 'trends',
    hashStart: '#trends',
    view: async() => await (await import('../pages/trendings.js')).default()
  },
  {
    name: 'now',
    hashStart: '#now',
    view: async() => await (await import('../pages/playNow.js')).default()
  },
  {
    name: 'upcoming',
    hashStart: '#upcoming',
    view: async() => await (await import('../pages/upcoming.js')).default()
  },
  {
    name: 'people',
    hashStart: '#people',
    view: async() => await (await import('../pages/people.js')).default()
  },
  {
    name: 'category',
    hashStart: '#category=',
    view: async() => await (await import('../pages/categories.js')).default()
  },
  {
    name: 'search',
    hashStart: '#search=',
    view: async() => await (await import('../pages/search.js')).default()
  },
  {
    name: 'movie',
    hashStart: '#movie=',
    view: async() => await (await import('../pages/movie.js')).default()
  }
];
