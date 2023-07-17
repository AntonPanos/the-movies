import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IMovieDetails } from 'src/app/interfaces/movie.interface';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import * as MovieActions from '../../store/movieSlice/actions';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  movie$: Observable<IMovieDetails>;
  error$: Observable<string | null>;

  private _movieSub$: Subscription;
  private _movieId: string;

  private _rating: number;
  set rating(rate: string) {
    this._rating = Number(rate) * 10;
  }
  get rating(): number {
    return this._rating;
  }

  private _genres: Array<string>;
  set genres(g: string) {
    this._genres = g.split(',');
  }
  get genres(): Array<string> {
    return this._genres;
  }

  constructor(
    private _store: Store<IAppState>,
    private _route: ActivatedRoute
  ) {
    this.isLoading$ = this._store.select(({ movie }) => movie.isLoading);
    this.movie$ = this._store.select(({ movie }) => movie.movie);
    this.error$ = this._store.select(({ movie }) => movie.error);
    this._movieId = this._route.snapshot.paramMap.get('movieId') || '';
    this._movieSub$ = Subscription.EMPTY;
    this._rating = 0;
    this._genres = [];
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this._store.dispatch(
      MovieActions.getMovie({
        movieId: this._movieId,
      })
    );
    this._movieSub$ = this.movie$.subscribe({
      next: (movie) => {
        if (Object.keys(movie).length === 0) return;
        this.rating = movie.imdbRating;
        this.genres = movie.Genre;
      },
    });
  }

  trackByFn(index: number, genre: string): string {
    return genre;
  }

  ngOnDestroy(): void {
    this._movieSub$.unsubscribe();
  }
}
