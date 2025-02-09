import { Component, Input } from '@angular/core';
import { ReliefRequest } from '../../models/disaster-relief-request.model';
import { CommentComponent } from "../comment/comment.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input() isOpen: boolean = false;
  @Input() reliefData?: ReliefRequest;

  startY = 0; 
  currentY = 0;
  translateY = 100; 
  commenting = false;
  commentError = false;
  comment = "";

  constructor() {}

  toggleCommenting() {
    this.commenting = !this.commenting;
  }

  submitComment() {

  }

  toggleSheet(open: boolean) {
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
