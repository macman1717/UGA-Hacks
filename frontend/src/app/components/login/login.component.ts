import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() close = new EventEmitter();
  showPassword = false;

  username = '';
  password = '';
  fname = '';
  lname = '';
  email = '';
  registering = false;

  closePanel() {
    this.close.emit();
  }

  toggleRegister() {
    this.registering = !this.registering;
  }

  login() {
    console.log(`Logging in with: ${this.username}, ${this.password}`);
    this.closePanel();
  }
}
