import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RunService } from '../../../services/run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RunEvent } from '../../../models/run.model';
import { DatePipe, CommonModule } from '@angular/common';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { AuthService } from '@auth0/auth0-angular';
import { map, merge } from 'rxjs';

@Component({
  selector: 'app-run-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    NgxEditorModule,
    FormsModule
  ],
  templateUrl: './run-edit.component.html',
  styleUrl: './run-edit.component.css',
  providers: [DatePipe]
})
export class RunEditComponent implements OnInit, OnDestroy {

  constructor(private runService: RunService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  editor: Editor;

  currentRun: RunEvent;
  updatedRun: RunEvent;

  editForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    eventDate: ['', Validators.required],
    runType: ['', Validators.required],
    neighborhood: [''],
    venueName: [''],
    address: this.formBuilder.group({
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    }),
    eventIds: this.formBuilder.group({
      stravaEventId: [''],
      stravaRouteId: [''],
      meetUpEventId: [''],
      facebookEventId: ['']
    }),
  });

  ngOnInit(): void {
    this.editor = new Editor();

    this.getRun(this.route.snapshot.params["id"]);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getRun(id: string): void {
    this.runService.get(id)
      .subscribe({
        next: (data) => {
          let evDate = this.datePipe.transform(data.eventDate, 'y-MM-ddTHH:mm:ss', 'PST');
          data.eventDate = (evDate==null)?undefined:evDate;
          this.currentRun = data;
          this.editForm.patchValue({
            name: data.name,
            description: data.description,
            eventDate: data.eventDate,
            runType: data.runType,
            venueName: data.location.name,
            neighborhood: data.location.neighborhood,
            address: {
              streetAddress: data.location.streetAddress,
              city: data.location.city,
              state: data.location.state,
              zipCode: data.location.zipCode
            },
            eventIds: {
              facebookEventId: data.facebookEventId,
              stravaEventId: data.stravaEventId,
              stravaRouteId: data.stravaRouteId,
              meetUpEventId: data.meetUpEventId
            }
          });

          this.updatedRun = {};
          const self = this;

          merge(
            ...Object.keys(this.editForm.controls)
            .filter(
              f => (!f.startsWith('address')&&!f.startsWith('eventIds'))
            )
            .map(
              k => this.editForm.controls[k].valueChanges.pipe(
                map(v => ({ [k]: v })),
              )
            )
          ).subscribe({
              next(o: RunEvent) {
                self.updatedRun = Object.assign(self.updatedRun, o);
                console.log(self.updatedRun);
              }
            }
          );

          merge(
            ...Object.keys(this.editForm.controls['eventIds'].controls)
            .map(
              k => this.editForm.controls['eventIds'].controls[k].valueChanges.pipe(
                map(v => ({ [k]: v })),
              )
            )
          ).subscribe({
              next(o: RunEvent) {
                self.updatedRun = Object.assign(self.updatedRun, o);
                console.log(self.updatedRun);
              }
            }
          );
        },
        error: (e) => console.error(e)
      });
  }

  onSubmit(): void {
    console.log(this.editForm.controls.description.value);

    this.updatedRun = Object.assign(this.currentRun, this.updatedRun);
    this.updatedRun.location = this.updatedRun.location.id;

    console.log(this.updatedRun.eventDate);
    let runDate = new Date(Date.parse(this.updatedRun.eventDate.replace('T',' ')));
    let isoRunDate = runDate.toISOString();
    console.log(isoRunDate);
    this.updatedRun.eventDate = isoRunDate;
    console.log(this.updatedRun);

    this.runService.update(this.updatedRun.id, this.updatedRun).subscribe({
      next: (result) => {
        console.log(result);
        let message = result.message ? result.message : 'Update Successful';
        this.getRun(this.route.snapshot.params["id"]);
        this.editForm.markAsPristine();
        this.snackBar.open(message, "View", {
          duration: 5000,
        }).onAction().subscribe(
          o => this.router.navigate(["details", this.currentRun.id])
        );
      },
      error: (err) => {

      }
    });
  }
}
