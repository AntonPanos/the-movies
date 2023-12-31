import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from 'angular-toastify';
import { MovieService } from '../../services/movie/movie.service';
import * as MovieActions from './actions';

@Injectable()
export class MovieEffects {
  constructor(
    private _actions$: Actions,
    private _movieService: MovieService,
    private _toastr: ToastService
  ) {}

  getMovie$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MovieActions.getMovie),
      mergeMap(({ movieId }) => {
        return this._movieService.getMovie(movieId).pipe(
          map((movie) => {
            if (movie?.Error) throw new Error('Media not found');
            return MovieActions.getMovieSuccess({ movie });
          }),
          catchError((error) => {
            this._toastr.error(error.message);
            return of(MovieActions.getMovieFailure({ error: error.message }));
          })
        );
      })
    )
  );
}
