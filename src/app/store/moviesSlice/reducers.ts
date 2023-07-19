import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './actions';
import { IMoviesState } from 'src/app/interfaces/movie.interface';

export const initialState: IMoviesState = {
  isLoading: false,
  movies: [],
  error: null,
  search: '',
  filter: '',
};

export const moviesReducers = createReducer(
  initialState,
  on(MoviesActions.getMovies, (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
    search: action.search,
    filter: action.filter,
  })),
  on(MoviesActions.getMoviesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    movies: [...state.movies, ...action.movies],
    error: null,
  })),
  on(MoviesActions.getMoviesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  /* Reset Movies State */
  on(MoviesActions.resetMovies, (state) => ({
    ...state,
    movies: initialState.movies,
    error: initialState.error,
    isLoading: initialState.isLoading,
  }))
);
