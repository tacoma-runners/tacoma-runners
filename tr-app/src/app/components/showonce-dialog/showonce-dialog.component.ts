import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-showonce-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './showonce-dialog.component.html',
  styleUrl: './showonce-dialog.component.css'
})
export class ShowonceDialogComponent {
  constructor(
    public global: GlobalService,
    public dialogRef: MatDialogRef<ShowonceDialogComponent>
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
