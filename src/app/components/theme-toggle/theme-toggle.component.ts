import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  isDark: boolean;

  constructor() {
    this.isDark = false;
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('isDark') &&
      localStorage.getItem('isDark') === 'true'
    ) {
      this.isDark = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.isDark = false;
    }
  }

  changeTheme(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    localStorage.setItem('isDark', String(checked));
    if (checked) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.setAttribute('data-theme', 'light');
  }

  // switchTheme(e) {
  //   if (e.target.checked) {
  //     localStorage.setItem('theme', 'dark');
  //     document.documentElement.setAttribute('data-theme', 'dark');
  //     toggleSwitch.checked = true;
  //   } else {
  //     localStorage.setItem('theme', 'light');
  //     document.documentElement.setAttribute('data-theme', 'light');
  //     toggleSwitch.checked = false;
  //   }
  // }
}
