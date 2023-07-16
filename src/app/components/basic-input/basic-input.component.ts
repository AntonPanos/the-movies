import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as MovieActions from '../../store/movieSlice/actions';
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

  changeCategory(): void {
    console.log(this.searchForm.value);
  }

  onSearch(): void {
    this._store.dispatch(
      MovieActions.getMovies({
        search: this.searchForm.value.search,
        filter: this.searchForm.value.category,
      })
    );
  }
}
