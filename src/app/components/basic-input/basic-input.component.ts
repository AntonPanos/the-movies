import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../../store/moviesSlice/actions';
import { IAppState } from 'src/app/interfaces/app-state.interface';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
})
export class BasicInputComponent {
  searchForm: FormGroup;
  categories: Array<{ label: string; value: string }>;

  constructor(private _store: Store<IAppState>) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      category: new FormControl('movie'),
    });
    this.categories = [
      {
        label: 'Movies',
        value: 'movie',
      },
      {
        label: 'Series',
        value: 'series',
      },
    ];
  }

  onSearch(): void {
    this._store.dispatch(
      MoviesActions.getMovies({
        search: this.searchForm.value.search,
        filter: this.searchForm.value.category,
      })
    );
  }

  trackByFn(index: number, category: { label: string; value: string }): string {
    return category.value;
  }
}
