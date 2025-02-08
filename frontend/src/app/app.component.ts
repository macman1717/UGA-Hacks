import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { HeaderComponent } from "./components/header/header.component";
import { DetailsComponent } from "./components/details/details.component";
import { MarkerInfo } from './models/MarkerInfo.model';
import { ScratchPaperComponent } from "./scratch-paper/scratch-paper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, HeaderComponent, DetailsComponent, ScratchPaperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(DetailsComponent) detailsSheet!: DetailsComponent;


  title = 'frontend';
  ngOnInit() {
    console.log('AppComponent loaded');
  }
  
  showDetails = false;
  selectedLocation?: MarkerInfo = undefined;

  openDetails(location: MarkerInfo) {
    if (!location) {
      this.selectedLocation = undefined;
      this.showDetails = false;
      this.detailsSheet.toggleSheet(false);
    } else {
      this.selectedLocation = location;
      this.showDetails = true;
      this.detailsSheet.toggleSheet(true);
    }
  }

}
