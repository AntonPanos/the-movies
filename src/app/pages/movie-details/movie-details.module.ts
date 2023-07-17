import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MovieDetailsComponent } from './movie-details.component';
import { movieReducers } from 'src/app/store/movieSlice/reducers';
import { MovieEffects } from 'src/app/store/movieSlice/effects';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('movie', movieReducers),
    EffectsModule.forFeature([MovieEffects]),
    ComponentsModule,
  ],
  providers: [],
  declarations: [MovieDetailsComponent],
  exports: [MovieDetailsComponent],
})
export class MovieDetailsModule {}
