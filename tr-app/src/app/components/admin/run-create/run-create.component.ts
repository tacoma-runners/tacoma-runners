import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, from, map, merge, of } from 'rxjs';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Editor, NgxEditorModule, Toolbar, toHTML } from 'ngx-editor';
import { LocationService } from '../../../services/location.service';
import { EventLocation } from '../../../models/location.model';
import { MatDialog } from '@angular/material/dialog';
import { LocationCreateComponent } from '../location-create/location-create.component';
import { RunService } from '../../../services/run.service';
import { RunEvent } from '../../../models/run.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-run-create',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxEditorModule,
  ],
  templateUrl: './run-create.component.html',
  styleUrl: './run-create.component.css'
})
export class RunCreateComponent implements OnInit, OnDestroy {
  stepperOrientation: Observable<StepperOrientation>;
  @ViewChild('stepper') stepper: MatStepper;
  editor: Editor;
  locations$: EventLocation[];
  locationsLoaded: boolean = false;
  selectedLocation: any = '';
  eventDate: string = '';
  newRun: RunEvent = {};
  newLocation: EventLocation = new EventLocation();
  saving: boolean = false;
  errorMessage: string | null = null;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
  ];

  get formArray(): AbstractControl | null {
    return this.runFormGroup.get('formArray');
  }

  get finalForm(): FormGroup {
    return this.formArray.get([2]) as FormGroup;
  }

  runFormGroup: FormGroup = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.formBuilder.group({
        runType: [null, Validators.required],
      }),
      this.formBuilder.group({
        location: [null, Validators.required],
        eventDate: [null, Validators.required],
      }),
      this.formBuilder.group({
        name: [null, Validators.required],
        // description: [null, Validators.required],
        stravaEventId: [null],
        stravaRouteId: [null],
        meetUpEventId: [null],
        facebookEventId: [null],
      }),
    ])
  });

  ngOnInit(): void {
    this.editor = new Editor();
    this.retrieveLocations();

    // Add a valueChanges observer to all fields to populate the newRun object.
    const self = this;
    const formAry: FormArray = this.formArray as FormArray;
    merge(
      ...Object.keys(formAry.controls)
      .map(
        k => formAry.controls[k].valueChanges.pipe(
          map(v => ({ [k]: v })),
        )
      )
    ).subscribe({
        next(o) {
          Object.keys(o).forEach((e) => {
            self.newRun = Object.assign(self.newRun, o[e]);
          });
        }
      }
    );

    this.editor.valueChanges.pipe().subscribe(content => {
      this.newRun.description = toHTML(content);
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  constructor(
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    @Inject(LOCALE_ID) public locale: string,
    private runService: RunService,
    private locationService: LocationService,
    public locationDialog: MatDialog,
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.runFormGroup.valueChanges.subscribe(data => {
      this.runFormGroup.patchValue(data, {emitEvent: false});
    });
  }

  retrieveLocations(): void {
    this.locationService.getAll().subscribe(locations => {
      this.locations$ = locations;
    });
  }

  onStepChange(event: StepperSelectionEvent): void {
    if (event.previouslySelectedIndex==0 && event.selectedIndex==1) {

      const eventDate = this.runFormGroup.controls['formArray'].get([1]).get('eventDate').value;
      const eventType = event.previouslySelectedStep.stepControl.value['runType'];

      if (eventType == 'saturday-5k') {
        if (this.selectedLocation == '') {
          this.selectedLocation = '8abc4ef2-4d07-40cc-9eec-1fb514d5f814';
        }

        if (eventDate == '' || eventDate == null) {
          let nextSaturday = this.getNextDayOfTheWeek("Saturday");
          nextSaturday.setHours(8,30);
          let nextSatFormat: string = formatDate(nextSaturday, 'yyyy-MM-ddTHH:mm',this.locale);
          this.runFormGroup.controls['formArray'].get([1]).patchValue({
            eventDate: nextSatFormat
          });
        }
      } else if (eventType == 'thursday-run') {
        if (eventDate == '' || eventDate == null) {
          let nextThursday = this.getNextDayOfTheWeek("Thursday");
          nextThursday.setHours(18,30);
          let nextThuFormat: string = formatDate(nextThursday, 'yyyy-MM-ddTHH:mm',this.locale);
          this.runFormGroup.controls['formArray'].get([1]).patchValue({
            eventDate: nextThuFormat
          });
        }
      }
    }
  }

  getNextDayOfTheWeek(dayName, excludeToday = false, refDate = new Date()): Date | null {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"].indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return null;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
  }

  openLocationDialog(): void {

    this.newLocation.city = 'Tacoma';
    this.newLocation.state = 'WA';
    this.newLocation.zipCode = 984;

    const dialogRef = this.locationDialog.open(LocationCreateComponent, {
      data: this.newLocation,
      minWidth: '50%',
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.updateLocation(result).subscribe({
        next: result => {
          this.retrieveLocations();
        }
      });
    });
  }

  updateLocation(updatedLocation: any): Observable<EventLocation> | null {
    updatedLocation.zipCode = parseInt(updatedLocation.zipCode, 10);

    return this.locationService.update(updatedLocation.id, updatedLocation);
  }

  onSubmit(): void {
    this.createRun();
  }

  createRun(): void {
    this.showError();
    this.saving = true;
    // Convert run date from input to ISO version
    let runDate = new Date(Date.parse(this.newRun.eventDate.replace('T',' ')));
    let isoRunDate = runDate.toISOString();
    this.newRun.eventDate = isoRunDate;

    this.runService.create(this.newRun).subscribe({
      next: (result) => {
        console.log(result);
        this.newRun = result;
        this.stepper.next();
        this.saving = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error("createRun(): ", err);
        this.showError(err?.error?.message);
        this.saving = false;
      }
    });
  }

  viewRun(): void {
    this.router.navigate(["details", this.newRun.id]);
  }

  showError(errMsg: string | null = null) {
    this.errorMessage = errMsg;
  }

  restartFlow(): void {
    this.stepper.reset();
    this.newRun = new RunEvent();
  }
}

