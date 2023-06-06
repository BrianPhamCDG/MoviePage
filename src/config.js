export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = `a604f410165b50edcde91d2a945a01ba`;

export const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";

export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieCredit: (type) =>
    `${tmdbEndpoint}${type}/credits?api_key=${apiKey}&language=en-US`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
