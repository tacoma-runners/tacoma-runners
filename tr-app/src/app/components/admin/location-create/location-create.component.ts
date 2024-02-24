import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventLocation } from '../../../models/location.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, merge } from 'rxjs';

@Component({
  selector: 'app-location-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './location-create.component.html',
  styleUrl: './location-create.component.css'
})
export class LocationCreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LocationCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public newLocation: EventLocation,
    private formBuilder: FormBuilder
  ) {}

  locationForm = this.formBuilder.group({
    name: [this.newLocation.name, Validators.required],
    streetAddress: [this.newLocation.streetAddress, Validators.required],
    city: [this.newLocation.city, Validators.required],
    state: [this.newLocation.state, Validators.required],
    zipCode: [this.newLocation.zipCode, Validators.required],
    neighborhood: [this.newLocation.neighborhood],
    googlePlaceId: [this.newLocation.googlePlaceId]
  });


  ngOnInit(): void {
    // Add a valueChanges observer to all fields to populate the newLocation object.
    const self = this;
    merge(
      ...Object.keys(this.locationForm.controls)
      .map(
        k => this.locationForm.controls[k].valueChanges.pipe(
          map(v => ({ [k]: v })),
        )
      )
    ).subscribe({
        next(o) {
          self.newLocation = Object.assign(self.newLocation, o);
          console.log(self.newLocation);
        }
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
