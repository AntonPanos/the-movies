import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home.component';
import { movieReducers } from '../../store/movieSlice/reducers';
import { MoviesEffects } from '../../store/movieSlice/effects';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { BasicInputComponent } from '../../components/basic-input/basic-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('movies', movieReducers),
    EffectsModule.forFeature([MoviesEffects]),
  ],
  providers: [],
  declarations: [
    HomeComponent,
    LoaderComponent,
    MovieCardComponent,
    BasicInputComponent,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
