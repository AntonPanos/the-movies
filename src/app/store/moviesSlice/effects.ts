import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from 'angular-toastify';
import { MovieService } from '../../services/movie/movie.service';
import * as MoviesActions from './actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private _actions$: Actions,
    private _movieService: MovieService,
    private _toastr: ToastService
  ) {}

  getMovies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MoviesActions.getMovies),
      mergeMap(({ search, filter, page }) => {
        return this._movieService.getMovies(search, filter, page).pipe(
          map((movies) => {
            if (movies?.Error) throw new Error('No media found');
            return MoviesActions.getMoviesSuccess({ movies: movies.Search });
          }),
          catchError((error) => {
            this._toastr.error(error.message);
            return of(MoviesActions.getMoviesFailure({ error: error.message }));
          })
        );
      })
    )
  );
}
