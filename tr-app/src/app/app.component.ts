import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { MaterialModule } from './material/material.module';
import { Observable } from 'rxjs';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faStrava, faInstagram, faMeetup } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, MaterialModule, RouterOutlet, RouterModule, NavigationComponent, FontAwesomeModule]
})
export class AppComponent implements OnInit {
  title = 'Tacoma Runners';
  faFacebook = faFacebookF;
  faStrava = faStrava;
  faInstagram = faInstagram;
  faMeetup = faMeetup;

  @ViewChild('sidenav') sidenav: any;

  public isHandset$: Observable<boolean> = this.observer
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  public isLoaded:boolean = false;

  constructor(private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.isLoaded = true;
  }
}
