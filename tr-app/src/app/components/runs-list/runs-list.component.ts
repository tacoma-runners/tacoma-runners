import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RunEvent } from '../../models/run.model';
import { RunService } from '../../services/run.service';
import { MaterialModule } from '../../material/material.module';
import { RunDetailsComponent } from '../run-details/run-details.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, tap } from 'rxjs';
import { RunsDataSource } from '../../services/run.datasource';

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

  constructor(private runService: RunService,
    public auth: AuthService) { }

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
}
