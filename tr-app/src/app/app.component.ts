import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: any;

  public isHandset$: Observable<boolean> = this.observer
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(private observer: BreakpointObserver, private router: Router) {}

  ngAfterViewInit() {
    // this.observer
    //   .observe(['(max-width: 800px)'])
    //   .subscribe((res) => {
    //     if (res.matches) {
    //       this.sidenav.mode = 'over';
    //       this.sidenav.close();
    //     } else {
    //       this.sidenav.mode = 'side';
    //       this.sidenav.open();
    //     }
    //   });
  }

  closeSideNav() {
    if (this.sidenav._mode=='over') {
      this.sidenav.close();
    }
  }
}
