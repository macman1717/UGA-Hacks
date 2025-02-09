import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { ReliefRequest } from '../../models/disaster-relief-request.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  @Output() locationSelected = new EventEmitter();
  markers: L.Marker[] = [];
  selectedMarker?: L.Marker;

  redMarkerIcon = L.icon({
    iconUrl: 'locator.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  selectedIcon = L.icon({
    iconUrl: 'locatorSelected.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [35, 51],
    iconAnchor: [17, 51],
    popupAnchor: [1, -44]
  });

  markerInfos: ReliefRequest[] = [
    {
      latitude: 51.505,
      longitude: -0.08,
      category: "Food",
      title: "I want food",
      description: "GIVE ME FOOD!!!!",
      id: 'test',
      date: '2025-02-08T06:39:13.183Z',
      link: '',
      user_id: '',
      watchlist: [],
      comments: [
        {
          username: 'Sean Nolan',
          content: 'Damn girl are you a multi-label binary classification model? Cus my binary cross entropy function is losing itself',
          relief_request: "Hi",
          date: '2025-02-08T06:39:13.183Z',
          id: '1',
          relief_request: 'test'
        },
        {
          username: 'Sean Nolan',
          content: 'Damn girl are you a multi-label binary classification model? Cus my binary cross entropy function is losing itself',
          relief_request: "Hi",
          date: '2025-02-08T06:39:13.183Z',
          id: '2',
          relief_request: 'test'
        }
      ],
      like: 0
    },

  ]

  deselectMarker(marker?: L.Marker) {
    if (!marker) return;
    marker.setIcon(this.redMarkerIcon);
    this.selectedMarker = undefined;
    this.locationSelected.emit();
  }

  getMarkerInfoFromMarker(marker: L.Marker): ReliefRequest | null {
    const lat = marker.getLatLng().lat;
    const long = marker.getLatLng().lng;

    for (const info of this.markerInfos) {
      if (info.latitude == lat && info.longitude == long) {
        return info;
      }
    }

    return null;
  }

  selectMarker(marker: L.Marker) {
    if (this.selectedMarker) {
      this.deselectMarker(this.selectedMarker);
    }

    marker.setIcon(this.selectedIcon);
    this.selectedMarker = marker;
    this.locationSelected.emit(this.getMarkerInfoFromMarker(this.selectedMarker));
  }


  ngAfterViewInit(): void {
    const map = L.map('map', {zoomControl: false}).setView([51.505, -0.09], 13);

    map.on('click', () => {
      this.deselectMarker(this.selectedMarker);
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);




    for (const info of this.markerInfos) {
      const marker = L.marker([info.latitude, info.longitude], { icon: this.redMarkerIcon, riseOnHover: true, riseOffset: 300 })
      marker.addTo(map);

      marker.on('click', () => {
        if (marker.options.icon === this.redMarkerIcon) {
          this.selectMarker(marker);
        } else {
          this.deselectMarker(marker);
        }
      });

      marker.bindTooltip(info.title, { permanent: false, direction: "top", offset: [0, -40] });
      this.markers.push(marker);
    }
  }
}
