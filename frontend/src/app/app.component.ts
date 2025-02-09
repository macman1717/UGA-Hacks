import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { HeaderComponent } from "./components/header/header.component";
import { DetailsComponent } from "./components/details/details.component";
import { ReliefRequest } from './models/disaster-relief-request.model';
import { LoginComponent } from "./components/login/login.component";
import { CreateRequestComponent } from "./components/create-request/create-request.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, HeaderComponent, DetailsComponent, LoginComponent, CreateRequestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(DetailsComponent) detailsSheet!: DetailsComponent;


  title = 'frontend';
  isProfileOpen = false;
  isCreateRequestOpen = false;

  ngOnInit() {
    console.log('AppComponent loaded');
  }
  
  showDetails = false;
  selectedLocation?: ReliefRequest = undefined;

  openDetails(location: ReliefRequest) {
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

  openProfile() {
    this.isProfileOpen = true;
  }

  closeProfile() {
    this.isProfileOpen = false;
  }

  openCreateRequest() {
    this.isCreateRequestOpen = true;
  }

  closeCreateRequest() {
    this.isCreateRequestOpen = false;
  }

}
