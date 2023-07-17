import { createAction, props } from '@ngrx/store';
import { IMovieDetails } from '../../interfaces/movie.interface';

export const getMovie = createAction(
  '[Movie] Getting a Movie',
  props<{ movieId: string }>()
);
export const getMovieSuccess = createAction(
  '[Movie] Get a Movie success',
  props<{ movie: IMovieDetails }>()
);
export const getMovieFailure = createAction(
  '[Movie] Get a Movie failure',
  props<{ error: string }>()
);
