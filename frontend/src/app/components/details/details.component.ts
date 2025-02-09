import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReliefRequest } from '../../models/disaster-relief-request.model';
import { CommentComponent } from "../comment/comment.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/disaster-relief-request.model';

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
  @Output() commentAdded = new EventEmitter();

  startY = 0; 
  currentY = 0;
  translateY = 100; 
  commenting = false;
  commentError = false;
  comment = "";

  constructor(private commentService: CommentService) {}

  toggleCommenting() {
    this.commenting = !this.commenting;
  }

  deleteComment(toDelete: Comment) {
    if (!this.reliefData) return alert('no relief data') ;

    console.log(toDelete.id);
    this.commentService.deleteComment(toDelete.id).subscribe({
      next: () => {
        this.reliefData!.comments = this.reliefData?.comments?.filter(comment => comment.id !== toDelete.id) || [];
        this.commenting = false;
        this.comment = '';
      },
      error: (err) => {
        console.error("Failed to delete comment", err);
      }
    });
}


  submitComment() {
    if (!this.reliefData) return;

    const username = localStorage.getItem('username');
    if (!username) return alert("You must be logged in to comment.");

    const newComment: Comment = {
      id: '-1',
      relief_request: this.reliefData.id,
      username: username,
      content: this.comment,
      date: '',
    }

    this.commentService.postComment(newComment).subscribe({
      next: (response) => {
        this.reliefData?.comments.push(response);
        this.commenting = false;
        this.comment = '';
      },
      error: (err) => {
        console.error("Failed to post comment", err);
      }
    });
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
