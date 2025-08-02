import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { MaterialModule } from '../../material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-donate-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './donate-modal.component.html',
  styleUrl: './donate-modal.component.css',
})
export class DonateModalComponent {
  constructor(
    public global: GlobalService,
    public dialogRef: MatDialogRef<DonateModalComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
