import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RunEvent } from '../../models/run.model';
import { RunService } from '../../services/run.service';
import { MaterialModule } from '../../material/material.module';
import { RunDetailsComponent } from '../run-details/run-details.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-runs-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RunDetailsComponent, RouterModule],
  templateUrl: './runs-list.component.html',
  styleUrl: './runs-list.component.css'
})
export class RunsListComponent implements OnInit {

  runs?: RunEvent[];
  currentRun: RunEvent = {};
  currentIndex = -1;
  title = '';
  loaded:boolean = false;

  constructor(private runService: RunService,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.retrieveRuns();
  }

  retrieveRuns(): void {
    this.runService.getAll()
      .subscribe({
        next: (data) => {
          this.runs = data;
          //console.log(data);
          this.loaded = true;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveRuns();
    this.currentRun = {};
    this.currentIndex = -1;
  }

  setActiveRun(run: RunEvent, index: number): void {
    this.currentRun = run;
    this.currentIndex = index;
  }

  /* searchTitle(): void {
    this.currentRun = {};
    this.currentIndex = -1;

    this.runService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.runs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  resetSearch(): void {
    this.title = '';
    this.searchTitle();
  } */

}
