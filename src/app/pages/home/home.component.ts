import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../../store/moviesSlice/actions';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { IMovie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollDiv', { static: false }) scrollDiv!: ElementRef;

  subMovies: Subscription;
  subSearch: Subscription;
  subFilter: Subscription;

  isLoading$: Observable<boolean>;
  movies$: Observable<Array<IMovie>>;
  search$: Observable<string>;
  filter$: Observable<string>;

  isVisible: boolean;

  private _activePage: number;
  private _search: string;
  private _filter: string;

  constructor(private _store: Store<IAppState>) {
    this.subMovies = Subscription.EMPTY;
    this.subSearch = Subscription.EMPTY;
    this.subFilter = Subscription.EMPTY;

    this.isLoading$ = this._store.select(({ movies }) => movies.isLoading);
    this.movies$ = this._store.select(({ movies }) => movies.movies);
    this.search$ = this._store.select(({ movies }) => movies.search);
    this.filter$ = this._store.select(({ movies }) => movies.filter);

    this.isVisible = false;

    this._activePage = 1;
    this._search = '';
    this._filter = '';
  }

  ngAfterViewInit(): void {
    this.subSearch = this.search$.subscribe({
      next: (value) => (this._search = value),
    });
    this.subFilter = this.filter$.subscribe({
      next: (value) => (this._filter = value),
    });

    this.subMovies = this.movies$.subscribe({
      next: (movies) => {
        this.checkDivVisibility();
        if (Object.keys(movies).length > 0 && this.isVisible) {
          this._activePage += 1;
          this.getMoreMovies(this._activePage);
        }
      },
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkDivVisibility();
    if (this.isVisible) {
      this._activePage += 1;
      this.getMoreMovies(this._activePage);
    }
  }

  checkDivVisibility(): void {
    const divElement = this.scrollDiv.nativeElement;
    const rect = divElement.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    this.isVisible = isVisible;
  }

  getMoreMovies(page: number) {
    const strPage = String(page);
    this._store.dispatch(
      MoviesActions.getMovies({
        search: this._search,
        filter: this._filter,
        page: strPage,
      })
    );
  }

  trackByFn(index: number, movie: IMovie): string {
    return movie.imdbID;
  }

  ngOnDestroy(): void {
    this.subMovies.unsubscribe();
    this.subSearch.unsubscribe();
    this.subFilter.unsubscribe();
  }
}
