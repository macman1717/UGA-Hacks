import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";

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
    private loginService: LoginService
  ) {}

  ngOnInit(){
    const data = this.loginService.getReliefRequestsByUser("Connor").subscribe();
    console.log(data)
  }

  // protected readonly console = console;
}
