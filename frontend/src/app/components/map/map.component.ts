import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { MarkerInfo } from '../../models/MarkerInfo.model';


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
  
  markerInfos: MarkerInfo[] = [
    {
      lat: 51.505,
      lng: -0.08,
      category: "Food",
      name: "I want food",
      description: "GIVE ME FOOD!!!!",
    },

    {
      lat: 51.50,
      lng: -0.08,
      category: "Medical",
      name: "Donate To Cancer",
      description: "I have cancer and I need money to give more people cancer.",
    },
  ]

  deselectMarker(marker?: L.Marker) {
    if (!marker) return;
    marker.setIcon(this.redMarkerIcon);
    this.selectedMarker = undefined;
    this.locationSelected.emit();
  }

  getMarkerInfoFromMarker(marker: L.Marker): MarkerInfo | null {
    const lat = marker.getLatLng().lat;
    const long = marker.getLatLng().lng;

    for (const info of this.markerInfos) {
      if (info.lat == lat && info.lng == long) {
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
      const marker = L.marker([info.lat, info.lng], { icon: this.redMarkerIcon, riseOnHover: true, riseOffset: 300 })
      marker.addTo(map);

      marker.on('click', () => {
        if (marker.options.icon === this.redMarkerIcon) {
          this.selectMarker(marker);
        } else {
          this.deselectMarker(marker);
        }
      });

      marker.bindTooltip(info.name, { permanent: false, direction: "top", offset: [0, -40] });
      this.markers.push(marker);
    }
  }
}
