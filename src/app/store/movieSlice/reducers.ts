import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './actions';
import { IMovieState } from 'src/app/interfaces/movie.interface';

export const initialState: IMovieState = {
  isLoading: false,
  movies: [],
  error: null,
};

export const movieReducers = createReducer(
  initialState,
  on(MoviesActions.getMovies, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(MoviesActions.getMoviesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    movies: action.movies,
    error: null,
  })),
  on(MoviesActions.getMoviesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
