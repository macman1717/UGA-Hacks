import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReliefRequest } from '../../models/disaster-relief-request.model';
import { TitleCasePipe } from '@angular/common';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';

declare const google: any;

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent {
  @Output() close = new EventEmitter();
  request: ReliefRequest = {
    id: '',
    longitude: 0,
    latitude: 0,
    description: '',
    date: '',
    category: '',
    link: '',
    title: '',
    user_id: '',
    watchlist: [],
    comments: [],
    like: 0
  }

  constructor(private googleMapsLoader: GoogleMapsLoaderService) {}

  async ngAfterViewInit() {
    try {
      await this.googleMapsLoader.loadGoogleMaps();
      this.initializeAutocomplete();
    } catch (error) {
      console.error(error);
    }
  }

  submitRequest() {
    console.log(this.request);
  }

  initializeAutocomplete() {
    console.log("initialzied");
    const input = document.getElementById('locationInput') as HTMLInputElement;
    if (!input) return;

    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        this.request.latitude = place.geometry.location?.lat();
        this.request.longitude = place.geometry.location?.lng();
      }
    });
  }

  address = '';

  closePanel() {
    this.close.emit();
  }

  login() {
    this.closePanel();
  }
}
