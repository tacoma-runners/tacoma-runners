import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { RunEvent } from '../../models/run.model';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  thursdayRun?:RunEvent;
  saturdayRun?:RunEvent;

  constructor(private runService: RunService) { }

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
