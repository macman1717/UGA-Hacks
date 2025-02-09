import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare const google: any;


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() ProfileClicked = new EventEmitter();
  @Output() NewClicked = new EventEmitter();
  @Output() SearchChanged = new EventEmitter();
  darkMode = false;
  searchInput = '';
  
  constructor(private ngZone: NgZone) {
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

  onSearchChanged() {
    this.SearchChanged.emit(this.searchInput)
  }

  onNewClicked() {
    this.NewClicked.emit();
  }

  ngAfterViewInit(): void {
    console.log("INITTTT");
    this.waitForGoogleMaps(() => {
      console.log("WAITED");
      const input = document.getElementById('searchInput') as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            console.log(place.geometry.location?.lat());
          }
        });
      });
    });
  }

  private waitForGoogleMaps(callback: () => void): void {
    const interval = setInterval(() => {
      if ((window as any)['google'] && (window as any)['google'].maps) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  }


  private updateTheme() {
    const isDark =
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  console.log('Dark mode:', isDark); // Debugging
  document.documentElement.classList.toggle('dark', isDark);
  }
}
