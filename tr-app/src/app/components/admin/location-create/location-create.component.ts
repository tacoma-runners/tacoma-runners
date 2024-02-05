import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventLocation } from '../../../models/location.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MaterialModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './location-create.component.html',
  styleUrl: './location-create.component.css'
})
export class LocationCreateComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventLocation
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
