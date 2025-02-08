import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

type MarkerInfo = {
  lat: number,
  long: number,
  category: string,
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  markers: L.Marker[] = [];
  selectedMarker?: L.Marker;

  redMarkerIcon = L.icon({
    iconUrl: 'locator.png', 
    shadowUrl: 'assets/leaflet/marker-shadow.png', 
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  selectedIcon = L.icon({
    iconUrl: 'locatorSelected.png', 
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [35, 51],
    iconAnchor: [17, 51],
    popupAnchor: [1, -44]
  });
  
  markerInfos: MarkerInfo[] = [
    {
      lat: 51.505,
      long: -0.08,
      category: "Food"
    },

    {
      lat: 51.50,
      long: -0.08,
      category: "Food"
    },
  ]

  deselectMarker(marker?: L.Marker) {
    if (!marker) return;
    marker.setIcon(this.redMarkerIcon);
    this.selectedMarker = undefined;
  }

  selectMarker(marker: L.Marker) {
    if (this.selectedMarker) {
      this.deselectMarker(this.selectedMarker);
    }

    marker.setIcon(this.selectedIcon);
    this.selectedMarker = marker;
  }


  ngAfterViewInit(): void {
    const map = L.map('map', {zoomControl: false}).setView([51.505, -0.09], 13);

    map.on('click', () => {
      this.deselectMarker(this.selectedMarker);
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    for (const info of this.markerInfos) {
      const marker = L.marker([info.lat, info.long], { icon: this.redMarkerIcon, riseOnHover: true, riseOffset: 300 })
      marker.addTo(map);

      marker.on('click', () => {
        if (marker.options.icon === this.redMarkerIcon) {
          this.selectMarker(marker);
        } else {
          this.deselectMarker(marker);
        }
      });

      marker.bindTooltip("This is a hover tooltip!", { permanent: false, direction: "top", offset: [0, -40] });
      this.markers.push(marker);
    }
  }
}
