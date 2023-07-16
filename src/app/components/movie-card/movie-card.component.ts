import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input()
  movie: IMovie;

  constructor(private _router: Router) {
    this.movie = {} as IMovie;
  }

  goToDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]);
  }
}
