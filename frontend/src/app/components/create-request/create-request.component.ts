import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReliefRequest } from '../../models/disaster-relief-request.model';
import { TitleCasePipe } from '@angular/common';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';
import { MarkerService } from '../../services/marker.service';

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

  successfulSubmit = false;

  constructor(private googleMapsLoader: GoogleMapsLoaderService, private markerService: MarkerService) {}

  async ngAfterViewInit() {
    try {
      await this.googleMapsLoader.loadGoogleMaps();
      this.initializeAutocomplete();
    } catch (error) {
      console.error(error);
    }
  }

  submitRequest() {
    const user_id = localStorage.getItem('user-id');
    if (!user_id) {
      return alert("You must be signed in to post a request.");
    }

    this.request.user_id = user_id;
    
    this.markerService.postReliefRequest(this.request).subscribe({
      next: (response) => {
        this.successfulSubmit = true;
        this.markerService.setCoordinates({lat: this.request.latitude, lng: this.request.longitude});
      },
      error: (err) => {
        console.error("Request Post Failed:", err);
        alert("Post failed!");
      }
    });
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
    this.successfulSubmit = false;
    this.close.emit();
  }

  login() {
    this.closePanel();
  }
}
