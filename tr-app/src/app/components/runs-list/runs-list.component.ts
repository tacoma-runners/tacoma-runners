import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-runs-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RunDetailsComponent, RouterModule],
  templateUrl: './runs-list.component.html',
  styleUrl: './runs-list.component.css'
})
export class RunsListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable <RunEvent[]>;
  runs: RunEvent[];
  loaded:boolean = false;
  dataSource: MatTableDataSource<RunEvent>;

  constructor(private runService: RunService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.retrieveRuns();
  }

  retrieveRuns(): void {
    this.runService.getAll()
      .subscribe(data => {
          //this.runs = data;
          this.dataSource = new MatTableDataSource<RunEvent>(data.runs);
          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();
          //console.log(data);
          this.loaded = true;
      });
  }
}
