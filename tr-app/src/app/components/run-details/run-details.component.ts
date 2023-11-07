import { Component, Input, OnInit } from '@angular/core';
import { RunService } from 'src/app/services/run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThursdayRun } from 'src/app/models/run.model';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.css']
})
export class RunDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentRun: ThursdayRun = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private runService: RunService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getRun(this.route.snapshot.params["id"]);
    }
  }

  getRun(id: string): void {
    this.runService.get(id)
      .subscribe({
        next: (data) => {
          this.currentRun = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentRun.title,
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
  }

}