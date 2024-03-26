import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RunEvent, RunEventStatus } from './../../models/run.model';
import { RunService } from '../../services/run.service';
import { MaterialModule } from '../../material/material.module';
import { RunDetailsComponent } from '../run-details/run-details.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, tap } from 'rxjs';
import { RunsDataSource } from '../../services/run.datasource';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventLocation } from '../../models/location.model';

@Component({
  selector: 'app-runs-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RunDetailsComponent, RouterModule],
  templateUrl: './runs-list.component.html',
  styleUrl: './runs-list.component.css'
})
export class RunsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable <RunEvent[]>;
  runs: RunEvent[];
  loaded:boolean = false;
  dataSource: RunsDataSource;
  saving: boolean = false;

  public get RES(): typeof RunEventStatus {
    return RunEventStatus;
  }

  constructor(private runService: RunService,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new RunsDataSource(this.runService);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect().asObservable();
    this.dataSource.loadRuns(1, this.paginator.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.retrieveRunsPage())
    )
    .subscribe();
  }

  retrieveRunsPage(): void {
    this.dataSource.loadRuns(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  publishPendingRun(run: RunEvent): void {
    const fullLocation: any = run.location;
    if (run.status == RunEventStatus.Pending) {
      run.status = RunEventStatus.Published;
      if (fullLocation && typeof fullLocation === 'object') run.location = fullLocation.id;
      this.saving = true;
      this.runService.update(run.id, run).subscribe({
        next: (data) => {
          this.saving = false;
          run = data;
          this.snackBar.open('Publish Successful!', "View", {
            duration: 5000,
          }).onAction().subscribe(
            o => this.router.navigate(["details", run.id])
          );
        },
        error: (e) => {
          run.location = fullLocation;
          this.saving = false;
          run.status = RunEventStatus.Pending;
          console.error(e);
          this.snackBar.open('Publish Failed! Error details in console log.', '', {
            duration: 10000,
          })
        }
      });
    }
  }
}
