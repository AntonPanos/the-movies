export interface IMovie {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
}

export interface IMovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

export interface IMoviesState {
  isLoading: boolean;
  movies: Array<IMovie>;
  error: string | null;
}

export interface IMovieResponse {
  Search: Array<IMovie>;
  Response: 'True' | 'False';
  totalResults: string;
  Error?: string;
}

export interface IMovieState {
  isLoading: boolean;
  movie: IMovieDetails;
  error: string | null;
}
