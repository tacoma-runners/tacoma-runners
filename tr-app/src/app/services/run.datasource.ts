import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { RunEvent } from "../models/run.model";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { RunService } from "./run.service";
import { RunList } from "../models/runlist.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

export class RunsDataSource extends MatTableDataSource<RunEvent, MatPaginator> {

  private runsSubject = new BehaviorSubject<RunEvent[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private runService: RunService) { super(); }

  override connect(): BehaviorSubject<RunEvent[]> {
    return this.runsSubject;
  }

  override disconnect(): void {
    this.runsSubject.complete();
    this.loadingSubject.complete();
  }

  override

  runsCount(): Observable<number> {
    return this.countSubject.asObservable();
  }

  loadRuns(page: number = 1, take: number = 5) {
    this.loadingSubject.next(true);

    this.runService.getPage(page, take).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((data: RunList) => {
      this.runsSubject.next(data.runs);
      this.countSubject.next(data.count);
    });
  }
}
