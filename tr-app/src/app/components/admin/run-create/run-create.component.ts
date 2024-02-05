import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { LocationService } from '../../../services/location.service';
import { EventLocation } from '../../../models/location.model';
import { MatDialog } from '@angular/material/dialog';
import { LocationCreateComponent } from '../location-create/location-create.component';

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
  editor: Editor;
  locations$: EventLocation[];
  locationsLoaded: boolean = false;

  runFormGroup: FormGroup = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.formBuilder.group({
        runType: ['', Validators.required],
      }),
      this.formBuilder.group({
        runLocation: ['', Validators.required],
        eventDate: ['', Validators.required],
      }),
      this.formBuilder.group({
        runName: ['', Validators.required],
        description: [''],
        stravaEventId: [''],
        stravaRouteId: [''],
        meetupEventId: [''],
        facebookEventId: [''],
      }),
    ])
  });

  ngOnInit(): void {
    this.editor = new Editor();
    this.retrieveLocations();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get formArray(): AbstractControl | null {
    return this.runFormGroup.get('formArray');
  }

  selectedLocation: any = '';
  eventDate: string = '';
  newLocation: EventLocation = new EventLocation();

  constructor(
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    @Inject(LOCALE_ID) public locale: string,
    private locationService: LocationService,
    public locationDialog: MatDialog
  ) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.runFormGroup.valueChanges.subscribe(data => {
      this.runFormGroup.patchValue(data, {emitEvent: false});
    })
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
          this.selectedLocation = 1;
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
    this.newLocation.zipCode = '984';

    const dialogRef = this.locationDialog.open(LocationCreateComponent, {
      data: this.newLocation,
      minWidth: '50%',
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

