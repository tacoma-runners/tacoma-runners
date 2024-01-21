import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { AbstractControl, FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-run-create',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './run-create.component.html',
  styleUrl: './run-create.component.css'
})
export class RunCreateComponent {
  stepperOrientation: Observable<StepperOrientation>;

  runFormGroup = this.formBuilder.group({
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
        runNumber: ['', Validators.required],
        description: ['', Validators.required],
      }),
    ])
  });

  get formArray(): AbstractControl | null {
    return this.runFormGroup.get('formArray');
  }

  selectedLocation: string = '';

  constructor(
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onStepChange(event: StepperSelectionEvent): void {
    console.log(event);

    if (event.previouslySelectedIndex==0) {
      if (event.previouslySelectedStep.stepControl.value['runType'] == 'saturday-5k') {
        this.selectedLocation = '1';
      }
    }
  }
}
