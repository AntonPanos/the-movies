import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loaderDisplayStatus: string;

  constructor() {
    this.loaderDisplayStatus = 'display: none';
  }
}
