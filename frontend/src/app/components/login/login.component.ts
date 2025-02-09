import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

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

  constructor(private loginService: LoginService) {}

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
    if (this.registering) {
      this.loginService.registerUser(this.username, this.password, this.email, this.fname, this.lname).subscribe(response => {
        console.log(response);
      });
    } else {
      this.loginService.checkLogin(this.username, this.password).subscribe(response => {
        console.log(response);
      });
    }
    //console.log(`Logging in with: ${this.username}, ${this.password}`);
    this.closePanel();
  }
}
