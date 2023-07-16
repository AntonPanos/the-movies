import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMovieDetails } from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
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

  movie: IMovieDetails | null;

  constructor(
    private _route: ActivatedRoute,
    private _movieService: MovieService,
    private _toastr: ToastService
  ) {
    this._movieId = this._route.snapshot.paramMap.get('movieId') || '';
    this._movieSub$ = Subscription.EMPTY;
    this._rating = 0;
    this._genres = [];
    this.movie = null;
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this._movieSub$ = this._movieService
      .getMovie(this._movieId)
      .pipe()
      .subscribe({
        next: (value) => {
          if (value.Error) {
            this._toastr.error(value.Error);
            return;
          }
          this.movie = value;
          this.rating = this.movie.imdbRating;
          this.genres = this.movie.Genre;
        },
        error: (error) => {
          this._toastr.error(error.Error);
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
