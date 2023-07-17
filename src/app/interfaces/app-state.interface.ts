import { IMovieState, IMoviesState } from './movie.interface';

export interface IAppState {
  movies: IMoviesState;
  movie: IMovieState;
}
