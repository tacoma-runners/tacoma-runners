import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RunService } from '../../../services/run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RunEvent } from '../../../models/run.model';
import { DatePipe, CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { AuthService, GenericError } from '@auth0/auth0-angular';
import { Observable, filter, map, merge, mergeMap } from 'rxjs';
import { EventLocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { error } from 'console';

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
    private locationService: LocationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  editor: Editor;

  currentRun: RunEvent;
  currentLocation: EventLocation;
  updatedRun: any;
  updatedLocation: any;
  saving: boolean = false;

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

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
  ];

  ngOnInit(): void {
    this.editor = new Editor();

    this.auth.error$.pipe(
      filter((e) => e instanceof GenericError && e.error === 'login_required'),
      mergeMap(() => this.auth.loginWithRedirect())
    ).subscribe();

    this.getRun(this.route.snapshot.params["id"]).subscribe(run => this.processRun(run));
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getRun(id: string): Observable<RunEvent> {
    return this.runService.get(id);
  }

  preserveSpaces(html: string): string {
    return html?.replace(/ /g, '&nbsp;');
  }

  processRun(data: RunEvent): void {
    let evDate = this.datePipe.transform(data.eventDate, 'y-MM-ddTHH:mm:ss', 'PST');
    data.eventDate = (evDate==null)?undefined:evDate;
    this.currentRun = data;
    this.currentLocation = data.location;
    this.editForm.patchValue({
      name: data.name,
      description: this.preserveSpaces(data.description),
      eventDate: data.eventDate,
      runType: data.runType,
      venueName: data.location.name,
      neighborhood: data.location.neighborhood,
      address: {
        streetAddress: data.location.streetAddress,
        city: data.location.city,
        state: data.location.state,
        zipCode: data.location.zipCode?.toString()
      },
      eventIds: {
        facebookEventId: data.facebookEventId,
        stravaEventId: data.stravaEventId,
        stravaRouteId: data.stravaRouteId,
        meetUpEventId: data.meetUpEventId
      }
    });

    this.updatedRun = {};
    this.updatedLocation = {};
    const self = this;

    // Add a valueChanges observer to all non-address/eventId fields to populate the updatedRun object.
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
        next(o) {
          self.updatedRun = Object.assign(self.updatedRun, o);
          console.log(self.updatedRun);
        }
      }
    );

    // Add a valueChanges observer to all event/route Id fields to populate the updatedRun object.
    merge(
      ...Object.keys(this.editForm.controls['eventIds'].controls)
      .map(
        k => this.editForm.controls['eventIds'].controls[k].valueChanges.pipe(
          map(v => ({ [k]: v })),
        )
      )
    ).subscribe({
        next(o) {
          self.updatedRun = Object.assign(self.updatedRun, o);
          console.log(self.updatedRun);
        }
      }
    );

    // Add a valueChanges observer to all address fields to populate the updatedLocation object.
    merge(
      ...Object.keys(this.editForm.controls['address'].controls)
      .map(
        k => this.editForm.controls['address'].controls[k].valueChanges.pipe(
          map(v => ({ [k]: v })),
        )
      )
    ).subscribe({
        next(o) {
          self.updatedLocation = Object.assign(self.updatedLocation, o);
          console.log(self.updatedLocation);
        }
      }
    );
  }

  onSubmit(): void {
    this.saving = true;
    this.updateRun();
  }

  updateRun() {
    if (!this.isObjectEmpty(this.updatedRun)) {
      // Merge the original RunEvent with the updated version to send for update
      this.updatedRun = Object.assign(this.currentRun, this.updatedRun);
      // Update requires just location ID instead of expanded GET version
      this.updatedRun.location = this.updatedRun.location.id;

      // Convert run date from input to ISO version
      let runDate = new Date(Date.parse(this.updatedRun.eventDate.replace('T',' ')));
      let isoRunDate = runDate.toISOString();
      this.updatedRun.eventDate = isoRunDate;

      this.runService.update(this.updatedRun.id, this.updatedRun).subscribe({
        next: (result) => {
          console.log(result);
          let locUpdate = this.updateLocation();
          if (locUpdate instanceof Observable) {
            locUpdate.subscribe({
              next: (loc) => {
                this.postUpdates();
              },
              error: (err) => {
                console.error("updateRun() - updateLocation1: ", err);
              }
            });
          } else {
            this.postUpdates();
          }
        },
        error: (err) => {
          this.saving = false;
          console.error("updateRun(): ", err);
        }
      });
    } else {
      let locUpdate = this.updateLocation();
      if (locUpdate instanceof Observable) {
        locUpdate.subscribe({
          next: (loc) => {
            this.postUpdates();
          },
          error: (err) => {
            console.error("updateRun() - updateLocation2: ", err);
          }
        });
      }
    }
  }

  updateLocation(): Observable<EventLocation> | null {
    if (!this.isObjectEmpty(this.updatedLocation)) {
      this.updatedLocation = Object.assign(this.currentLocation, this.updatedLocation);
      this.updatedLocation.zipCode = parseInt(this.updatedLocation.zipCode, 10);

      return this.locationService.update(this.updatedLocation.id, this.updatedLocation);
    } else {
      return null;
    }
  }

  postUpdates():void {
    this.getRun(this.route.snapshot.params["id"]).subscribe(run => {
      this.processRun(run);
      this.editForm.markAsPristine();
      this.saving = false;
    });
    this.snackBar.open('Update Successful', "View", {
      duration: 5000,
    }).onAction().subscribe(
      o => this.router.navigate(["details", this.currentRun.id])
    );
  }

  isObjectEmpty(objectName: any): boolean {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  }
}
