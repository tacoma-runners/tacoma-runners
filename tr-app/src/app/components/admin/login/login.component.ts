import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private auth: AuthService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin() {
    console.log(this.loginForm.value);

    let username:any = this.loginForm.value.username;
    let password:any = this.loginForm.value.password;

    this.authenticationService.login(username, password)
      .subscribe(() => this.router.navigateByUrl("/runs-list"));
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
