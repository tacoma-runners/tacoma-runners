import { Component, OnInit } from '@angular/core';
import { ThursdayRun } from 'src/app/models/run.model';
import { RunService } from 'src/app/services/run.service';

@Component({
  selector: 'app-runs-list',
  templateUrl: './runs-list.component.html',
  styleUrls: ['./runs-list.component.css']
})
export class RunsListComponent implements OnInit {

  runs?: ThursdayRun[];
  currentRun: ThursdayRun = {};
  currentIndex = -1;
  title = '';

  constructor(private runService: RunService) { }

  ngOnInit(): void {
    this.retrieveRuns();
  }

  retrieveRuns(): void {
    this.runService.getAll()
      .subscribe({
        next: (data) => {
          this.runs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveRuns();
    this.currentRun = {};
    this.currentIndex = -1;
  }

  setActiveRun(run: ThursdayRun, index: number): void {
    this.currentRun = run;
    this.currentIndex = index;
  }

  searchTitle(): void {
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

}