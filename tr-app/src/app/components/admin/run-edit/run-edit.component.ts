import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { RunService } from '../../../services/run.service';
import { ActivatedRoute } from '@angular/router';
import { RunEvent } from '../../../models/run.model';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-run-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './run-edit.component.html',
  styleUrl: './run-edit.component.css',
  providers: [DatePipe]
})
export class RunEditComponent implements OnInit {

  constructor(private runService: RunService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) {}


  currentRun: RunEvent | undefined = undefined;

  editForm = this.formBuilder.group({
    name: [''],
    description: [''],
    eventDate: [''],
    runType: [''],
    neighborhood: [''],
    runNumber: [0],
    venueName: [''],
    address: this.formBuilder.group({
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    }),
    eventIds: this.formBuilder.group({
      stravaEventId: [''],
      meetupEventId: [''],
      facebookEventId: ['']
    }),
  });

  ngOnInit(): void {
    this.getRun(this.route.snapshot.params["id"]);
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
            runNumber: data.runNumber,
            venueName: data.venueName,
            neighborhood: data.neighborhood,
            address: {
              streetAddress: data.streetAddress,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode
            },
            eventIds: {
              facebookEventId: data.facebookEventId,
              stravaEventId: data.stravaEventId,
              meetupEventId: data.meetupEventId
            }
          });
        },
        error: (e) => console.error(e)
      });
  }

  onSubmit(): void {

  }
}
