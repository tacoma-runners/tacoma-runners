import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RunService } from '../../../services/run.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RunEvent, RunEventStatus, RunEventType } from '../../../models/run.model';
import { DatePipe, CommonModule } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { AuthService, GenericError } from '@auth0/auth0-angular';
import { Observable, filter, map, merge, mergeMap } from 'rxjs';
import { EventLocation } from '../../../models/location.model';
import { LocationService } from '../../../services/location.service';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { LocationCreateComponent } from '../location-create/location-create.component';
import { MatSelectChange } from '@angular/material/select';

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
    public locationDialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  public RES = RunEventStatus;
  public RET = RunEventType;

  editor: Editor;
  currentRun: RunEvent;
  currentLocation: EventLocation;
  updatedRun: any;
  updatedLocation: any;
  saving: boolean = false;
  locations$: EventLocation[];
  locationsLoaded: boolean = false;

  // editForm = this.formBuilder.group({
  //   name: [{value: ''}, Validators.required],
  //   description: [{value: ''}],
  //   eventDate: [{value: ''}, Validators.required],
  //   status: [{value: ''}, Validators.required],
  //   runType: [{value: ''}, Validators.required],
  //   stravaRouteId: [{value: ''}, Validators.required],
  //   location: this.formBuilder.group({
  //     locationId: [{value: ''}],
  //     neighborhood: [{value: '', disabled: true}],
  //     venueName: [{value: '', disabled: true}],
  //     streetAddress: [{value: '', disabled: true}],
  //     city: [{value: '', disabled: true}],
  //     state: [{value: '', disabled: true}],
  //     zipCode: [{value: '', disabled: true}],
  //   },),
  // });
  editForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    eventDate: ['', Validators.required],
    status: ['', Validators.required],
    runType: ['', Validators.required],
    stravaRouteId: [''],
    location: this.formBuilder.group({
      id: [''],
      neighborhood: [''],
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: [''],
    },),
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
    this.retrieveLocations();

    this.editForm.controls['location'].controls['neighborhood'].disable();
    this.editForm.controls['location'].controls['streetAddress'].disable();
    this.editForm.controls['location'].controls['city'].disable();
    this.editForm.controls['location'].controls['state'].disable();
    this.editForm.controls['location'].controls['zipCode'].disable();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getRun(id: string): Observable<RunEvent> {
    return this.runService.get(id);
  }

  preserveSpaces(html: string): string {
    return html?.replace(/\s\s/g, ' &nbsp;');
  }

  processRun(data: RunEvent): void {
    let evDate = this.datePipe.transform(data.eventDate, 'y-MM-ddTHH:mm:ss');
    data.eventDate = (evDate==null)?undefined:evDate;
    this.currentRun = data;
    if (data.location && typeof data.location === "object") {
      this.currentLocation = data.location;
      this.editForm.patchValue({
        name: data.name,
        description: this.preserveSpaces(data.description),
        eventDate: data.eventDate,
        runType: data.runType,
        status: data.status,
        stravaRouteId: data.stravaRouteId,
        location: {
          id: data.location.id,
          neighborhood: data.location.neighborhood,
          streetAddress: data.location.streetAddress,
          city: data.location.city,
          state: data.location.state,
          zipCode: data.location.zipCode?.toString()
        },
      });
    }

    this.updatedRun = {};
    this.updatedLocation = {};
    const self = this;

    // Add a valueChanges observer to all non-address/eventId fields to populate the updatedRun object.
    merge(
      ...Object.keys(this.editForm.controls)
      .map(
        k => this.editForm.controls[k].valueChanges.pipe(
          map(v => ({ [k]: v })),
        )
      )
    ).subscribe({
        next(o) {
          self.updatedRun = Object.assign(self.updatedRun, o);
          //console.log(self.updatedRun);
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
          this.processRun(result);
          this.editForm.markAsPristine();
          this.saving = false;
          this.postUpdates();
        },
        error: (err) => {
          this.saving = false;
          console.error("updateRun(): ", err);
        }
      });
    }
  }

  retrieveLocations(): void {
    this.locationService.getAll().subscribe(locations => {
      this.locations$ = locations;
    });
  }

  updateLocation(location: EventLocation): Observable<EventLocation> | null {
    if (!this.isObjectEmpty(location)) {
      return this.locationService.update(location.id, location);
    } else {
      return null;
    }
  }

  openLocationDialog(): void {
    const dialogRef = this.locationDialog.open(LocationCreateComponent, {
      data: this.currentLocation,
      minWidth: '50%',
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log(result);
        const locUpdate: EventLocation = new EventLocation();
        locUpdate.id = result.id;
        locUpdate.city = result.city;
        locUpdate.name = result.name;
        locUpdate.neighborhood = result.neighborhood;
        locUpdate.state = result.state;
        locUpdate.streetAddress = result.streetAddress;
        locUpdate.zipCode = parseInt(result.zipCode, 10);
        locUpdate.googlePlaceId = result.googlePlaceId;
        this.updateLocation(locUpdate).subscribe({
          next: result => {
            this.currentLocation = result;
            this.currentRun.location = this.currentLocation;

            this.editForm.patchValue({
              location: {
                neighborhood: this.currentLocation.neighborhood,
                streetAddress: this.currentLocation.streetAddress,
                city: this.currentLocation.city,
                state: this.currentLocation.state,
                zipCode: this.currentLocation.zipCode?.toString()
              },
            });
            this.retrieveLocations();
          }
        });
      }
    });
  }

  postUpdates():void {
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

  onLocationChange(value: any) {
    this.currentLocation = this.locations$.find((element) => element.id == value);
    this.currentRun.location = this.currentLocation;
    const data = this.currentRun;

    if (data.location && typeof data.location === "object") {
      this.editForm.patchValue({
        location: {
          neighborhood: data.location.neighborhood,
          streetAddress: data.location.streetAddress,
          city: data.location.city,
          state: data.location.state,
          zipCode: data.location.zipCode?.toString()
        },
      });
    }
  }
}
