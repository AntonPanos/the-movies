import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import {
  IMovieDetails,
  IMovieResponse,
} from 'src/app/interfaces/movie.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _movieUrl: string;
  private _apiKey: string;

  constructor(private http: HttpClient) {
    this._movieUrl = environment.apiUrl;
    this._apiKey = environment.apiKey;
  }

  getMovies(
    search: string,
    filter: string,
    page = '1'
  ): Observable<IMovieResponse> {
    const moviesResponse = this.http
      .get<IMovieResponse>(
        `${this._movieUrl}${this._apiKey}&s=${search}&type=${filter}&page=${page}`
      )
      .pipe(delay(1000));
    return moviesResponse;
  }

  getMovie(movieId: string): Observable<IMovieDetails> {
    const movieResponse = this.http
      .get<IMovieDetails>(
        `${this._movieUrl}${this._apiKey}&i=${movieId}&plot=full`
      )
      .pipe(delay(1000));
    return movieResponse;
  }
}
