import { Component, Input } from '@angular/core';
import { MarkerInfo } from '../../models/MarkerInfo.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() isOpen: boolean = false;
  @Input() locationData?: MarkerInfo;

  startY = 0; 
  currentY = 0;
  translateY = 100; 

  constructor() {}

  toggleSheet(open: boolean) {
    console.log("hi");
    console.log(this.locationData);
    this.isOpen = open;
    this.translateY = open ? 0 : 100;
  }
  

  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    this.currentY = event.touches[0].clientY;
    const diff = this.currentY - this.startY;

    if (diff > 0) {
      this.translateY = Math.min(100, (diff / window.innerHeight) * 100);
    }
  }

  onTouchEnd() {
    if (this.translateY > 50) {
      this.toggleSheet(false);
    } else {
      this.toggleSheet(true);
    }
  }
}
