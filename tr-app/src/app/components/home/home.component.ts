import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { RunEvent } from '../../models/run.model';
import { RunService } from '../../services/run.service';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '@auth0/auth0-angular';
import { CarouselComponent } from '../carousel/carousel.component';
import { CopyrightComponent } from '../copyright/copyright.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
    RouterModule,
    CarouselComponent,
    CopyrightComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  thursdayRun?:RunEvent;
  saturdayRun?:RunEvent;

  constructor(
    private runService: RunService,
    public global: GlobalService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getCurrentThursdayRun();
    this.getCurrentSaturdayRun();
  }

  getCurrentThursdayRun(): void {
    this.runService.getUpcoming("thursday-run")
      .subscribe({
        next: (data) => {
          this.thursdayRun = data;
        },
        error: (e) => console.error(e)
      });
  }

  getCurrentSaturdayRun(): void {
    this.runService.getUpcoming("saturday-5k")
      .subscribe({
        next: (data) => {
          this.saturdayRun = data;
        },
        error: (e) => console.error(e)
      });
  }
}
