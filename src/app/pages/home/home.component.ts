import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { IMovie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoading$: Observable<boolean>;
  movies$: Observable<Array<IMovie>>;

  constructor(private _store: Store<IAppState>) {
    this.isLoading$ = this._store.select(({ movies }) => movies.isLoading);
    this.movies$ = this._store.select(({ movies }) => movies.movies);
  }

  trackByFn(index: number, movie: IMovie): string {
    return movie.imdbID;
  }
}
