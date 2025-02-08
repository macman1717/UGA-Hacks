import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {MarkerService} from "../services/marker.service";

@Component({
  selector: 'app-scratch-paper',
  standalone: true,
  imports: [],
  templateUrl: './scratch-paper.component.html',
  styleUrl: './scratch-paper.component.css'
})
export class ScratchPaperComponent {

  data : any;

  constructor(
    private loginService: LoginService,
    private markerService: MarkerService
  ) {}

  ngOnInit(){
    console.log("Login in with valid creds:")
    this.loginService.checkLogin("Connor","admin123").forEach(value => console.log(value))
    console.log("Login in with invalid creds:")
    this.loginService.checkLogin("Connor","password").pipe().forEach(value => console.log(value))

    console.log("Relief Request By Username:")
    const dataRequestsByUser = this.markerService.getReliefRequestsByUser("Connor");
    dataRequestsByUser.forEach(value => console.log(value))

    const dataRequestByBounds = this.markerService.getReliefRequestsByBounds(13, 11, 54, 50);
    dataRequestByBounds.forEach(value => console.log(value))
  }

  // protected readonly console = console;
}
