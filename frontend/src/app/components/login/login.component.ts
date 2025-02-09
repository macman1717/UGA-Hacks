import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @Output() close = new EventEmitter();
  showPassword = false;

  constructor(private loginService: LoginService) {
    
  }

  username = '';
  password = '';
  fname = '';
  lname = '';
  email = '';
  registering = false;
  loggedIn = false;

  ngOnInit() {
    const user_id = localStorage.getItem('user-id');
    if (user_id) {
      this.loggedIn = true;
    }
  }
  
  signout() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('username');
    this.closePanel();
  }

  closePanel() {
    this.close.emit();
  }

  toggleRegister() {
    this.registering = !this.registering;
  }

  login() {
    if (this.registering) {
      this.loginService.registerUser(this.username, this.password, this.email, this.fname, this.lname).subscribe({
        next: (response) => {
          alert("Successfully registered! Please log in.");
          this.registering = false;
        },
        error: (err) => {
          console.error("Register failed:", err);
          alert("Register failed!");
        }
      });
    } else {
      this.loginService.checkLogin(this.username, this.password).subscribe({
        next: (response) => {
          localStorage.setItem('user-id', response.user_id);
          localStorage.setItem('username', this.username);
          alert("Successfully signed in!");
          this.closePanel();
        },
        error: (err) => {
          console.error("Login failed:", err);
          alert("Login failed! Please check your username and password.");
        }
      });
    }
    
  }
}
