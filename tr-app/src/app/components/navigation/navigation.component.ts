import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { GlobalService } from '../../services/global.service';

export declare type NavigationMode = 'side' | 'top';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  constructor(public global: GlobalService) {}

  @Input() mode!:NavigationMode;
  @Input() sidenav: any;

  closeSideNav() {
    if (this.sidenav._mode=='over') {
      this.sidenav.close();
    }
  }
}
