import { createAction, props } from '@ngrx/store';
import { IMovie } from '../../interfaces/movie.interface';

export const getMovies = createAction(
  '[Movies] Getting Movies',
  props<{ search: string; filter: string; page?: string }>()
);
export const getMoviesSuccess = createAction(
  '[Movies] Get Movies success',
  props<{ movies: Array<IMovie> }>()
);
export const getMoviesFailure = createAction(
  '[Movies] Get Movies failure',
  props<{ error: string }>()
);
