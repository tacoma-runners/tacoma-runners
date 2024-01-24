import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { LogoutButtonComponent } from '../admin/logout-button/logout-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';

export declare type NavigationMode = 'side' | 'top';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MaterialModule,
    RouterModule,
    LogoutButtonComponent,
    AsyncPipe
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  constructor(public global: GlobalService,
    public auth:AuthService) {}

  @Input() mode!:NavigationMode;
  @Input() sidenav: any;

  closeSideNav() {
    if (this.sidenav._mode=='over') {
      this.sidenav.close();
    }
  }
}
