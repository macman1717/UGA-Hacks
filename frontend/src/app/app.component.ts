import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from "./components/map/map.component";
import { HeaderComponent } from "./components/header/header.component";
import {ScratchPaperComponent} from "./scratch-paper/scratch-paper.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, HeaderComponent, ScratchPaperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  ngOnInit() {
    console.log('AppComponent loaded');
  }

}
