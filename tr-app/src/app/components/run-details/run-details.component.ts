import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RunService } from '../../services/run.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RunEvent, RunEventStatus } from '../../models/run.model';
import { MaterialModule } from '../../material/material.module';
import { SafePipe } from '../../safe.pipe';
import { AuthService } from '@auth0/auth0-angular';
import { StravaembedComponent } from '../stravaembed/stravaembed.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-run-details',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SafePipe,
    RouterModule,
    StravaembedComponent],
  templateUrl: './run-details.component.html',
  styleUrl: './run-details.component.css'
})
export class RunDetailsComponent implements OnInit {

  @Input() currentRun: RunEvent = {
    name: '',
    description: ''
  };

  message:string = '';
  public mapUrl:string = '';

  isLoaded: boolean = false;
  saving: boolean = false;

  public get RES(): typeof RunEventStatus {
    return RunEventStatus;
  }

  constructor(
    private runService: RunService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public auth: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.message = '';
    const runId = this.route.snapshot.params["id"];
    if (runId != undefined && runId != "") {
      this.getRun(runId);
    } else {
      this.router.navigateByUrl("/");
    }
  }

  getRun(id: string): void {
    this.runService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRun = data;
          //console.log(data);
          this.setGoogleMapUrl();
          this.isLoaded = true;
        },
        error: (e) => console.error(e)
      });
  }

  setGoogleMapUrl() {
    let url = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyA73WcAxjI0jvET7zFqw06pXdxaNBWs9Zk&q=';
    let param = '';
    if (this.currentRun.location && typeof this.currentRun.location === "object") {
      if (this.currentRun.location.googlePlaceId) {
        param = 'place_id:' + encodeURIComponent(this.currentRun.location.googlePlaceId);
      } else {
        param = encodeURIComponent(
          this.currentRun.location.streetAddress + " " +
          this.currentRun.location.city + "," +
          this.currentRun.location.state + " " +
          this.currentRun.location.zipCode);
      }
    }
    this.mapUrl = url + param;
  }

  goBack() {
    this.location.back();
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
          this.snackBar.open('Publish Successful!', "", {
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
