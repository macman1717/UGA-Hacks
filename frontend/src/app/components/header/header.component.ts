import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() ProfileClicked = new EventEmitter();
  @Output() NewClicked = new EventEmitter();
  darkMode = false;
  
  constructor() {
    this.darkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();
  }

  onProfileClicked() {
    this.ProfileClicked.emit();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  onNewClicked() {
    this.NewClicked.emit();
  }

  private updateTheme() {
    const isDark =
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  console.log('Dark mode:', isDark); // Debugging
  document.documentElement.classList.toggle('dark', isDark);
  }
}
