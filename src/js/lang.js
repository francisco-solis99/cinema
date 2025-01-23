import { getItemFromLocalStorage } from './utils';
const langTexts = {
  'es-ES': {
    '/': {
      search: 'Buscar peliculas',
      tendencies: 'Tendencias',
      playing: 'Reproduciendo ahora',
      upcoming: 'Próximamente',
      people: 'Personas',
      moviesLiked: 'Peliculas que te gustan',
      btnMore: 'Ver más',
      category: 'Categorias'
    },
    '/movie': {
      overview: 'Resumen',
      providers: 'Provedores en donde ver',
      cast: 'Reparto',
      reviews: 'Opiniones',
      similar: 'Peliculas Similares'
    }
  },
  'en-US': {
    '/': {
      search: 'Search your movie',
      tendencies: 'Tendencies',
      playing: 'Playing now',
      upcoming: 'Upcoming',
      people: 'People',
      moviesLiked: 'Movies that you love',
      btnMore: 'View more',
      category: 'Categories'
    },
    '/movie': {
      overview: 'Overview',
      providers: 'Watch Providers',
      cast: 'Top Billed Cast',
      reviews: 'Reviews',
      similar: 'Similar Movies'
    }
  }
};

export const genresTranslations = {
  action: ['Acción', 'Action'],
  adventure: ['Aventura', 'Advebture'],
  animation: ['Animación', 'Animation'],
  comedy: ['Comedia', 'Comedy'],
  crime: ['Crimen', 'Crime'],
  documentary: ['Documental', 'Documentary'],
  drama: ['Drama'],
  family: ['Familia', 'Family'],
  fantasy: ['Fantasía', 'Fantasy'],
  history: ['Historia', 'History'],
  horror: ['Terror', 'Horror'],
  music: ['Música', 'Music'],
  mistery: ['Misterio', 'Mistery'],
  romance: ['Romance', 'Romance'],
  'science-fiction': ['Ciencia ficción', 'Science fiction']
};

export function getTranslation({ view, section }) {
  const { language } = getItemFromLocalStorage('cinema-lang');
  const translation = langTexts[language ?? 'en-US'][view][section];
  return translation;
}
