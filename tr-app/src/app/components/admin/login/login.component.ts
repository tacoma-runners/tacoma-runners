import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginWithRedirect();
  }
}
