import { createReducer, on } from '@ngrx/store';
import * as MovieActions from './actions';
import { IMovieDetails, IMovieState } from 'src/app/interfaces/movie.interface';

export const initialState: IMovieState = {
  isLoading: false,
  movie: {} as IMovieDetails,
  error: null,
};

export const movieReducers = createReducer(
  initialState,
  on(MovieActions.getMovie, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(MovieActions.getMovieSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    movie: action.movie,
    error: null,
  })),
  on(MovieActions.getMovieFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
