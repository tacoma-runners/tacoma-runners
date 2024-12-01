import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MaterialModule } from './material/material.module';
import { Observable } from 'rxjs';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faStrava, faInstagram, faMeetup } from '@fortawesome/free-brands-svg-icons';
import { Platform } from '@angular/cdk/platform';
import { ShowonceDialogComponent } from './components/showonce-dialog/showonce-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, MaterialModule, RouterOutlet, RouterModule, NavigationComponent, FontAwesomeModule, ShowonceDialogComponent]
})
export class AppComponent implements OnInit {
  title = 'Tacoma Runners';
  faFacebook = faFacebookF;
  faStrava = faStrava;
  faInstagram = faInstagram;
  faMeetup = faMeetup;

  @ViewChild('sidenav') sidenav: any;

  public isHandset$: Observable<boolean> = this.observer
    .observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
    ])
    .pipe(map((result: BreakpointState) => result.matches));

  public isLoaded:boolean = false;

  constructor(private observer: BreakpointObserver,
    private router: Router,
    private platform: Platform,
    public openOnceDialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoaded = true;

    if (!this.platform.IOS) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((e: NavigationEvent) => {
        document.getElementsByTagName("router-outlet")[0].scrollIntoView();
      });
    }

    this.openLocationDialog();
  }

  openLocationDialog(): void {
    const dialogRef = this.openOnceDialog.open(ShowonceDialogComponent, {
      minWidth: '50%',
      disableClose: false,
      hasBackdrop: true
    });
  }
}
