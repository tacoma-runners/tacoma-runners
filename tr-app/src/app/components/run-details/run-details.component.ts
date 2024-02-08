import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RunService } from '../../services/run.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RunEvent } from '../../models/run.model';
import { MaterialModule } from '../../material/material.module';
import { SafePipe } from '../../safe.pipe';
import { AuthService } from '@auth0/auth0-angular';

export declare type ViewMode = 'user' | 'admin';

@Component({
  selector: 'app-run-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, SafePipe, RouterModule],
  templateUrl: './run-details.component.html',
  styleUrl: './run-details.component.css'
})
export class RunDetailsComponent implements OnInit {

  @Input() viewMode = 'user';

  @Input() currentRun: RunEvent = {
    name: '',
    description: ''
  };

  message:string = '';
  public mapUrl:string = '';

  isLoaded: boolean = false;

  constructor(
    private runService: RunService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public auth: AuthService) { }

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
    if (this.currentRun.location.googlePlaceId) {
      param = 'place_id:' + encodeURIComponent(this.currentRun.location.googlePlaceId);
    } else {
      param = encodeURIComponent(
        this.currentRun.location.streetAddress + " " +
        this.currentRun.location.city + "," +
        this.currentRun.location.state + " " +
        this.currentRun.location.zipCode);
    }
    this.mapUrl = url + param;
  }

  goBack() {
    this.location.back();
  }

  /* updatePublished(status: boolean): void {
    const data = {
      title: this.currentRun.name,
      description: this.currentRun.description,
      published: status
    };

    this.message = '';

    this.runService.update(this.currentRun.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentRun.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateRun(): void {
    this.message = '';

    this.runService.update(this.currentRun.id, this.currentRun)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This run was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteRun(): void {
    this.runService.delete(this.currentRun.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/runs']);
        },
        error: (e) => console.error(e)
      });
  } */

}
