
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
  }
];
