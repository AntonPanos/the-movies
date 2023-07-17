import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home.component';
import { moviesReducers } from '../../store/moviesSlice/reducers';
import { MoviesEffects } from '../../store/moviesSlice/effects';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { BasicInputComponent } from '../../components/basic-input/basic-input.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('movies', moviesReducers),
    EffectsModule.forFeature([MoviesEffects]),
    ComponentsModule,
  ],
  providers: [],
  declarations: [HomeComponent, MovieCardComponent, BasicInputComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
