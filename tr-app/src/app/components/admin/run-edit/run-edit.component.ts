import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { RunService } from '../../../services/run.service';
import { ActivatedRoute } from '@angular/router';
import { RunEvent } from '../../../models/run.model';
import { DatePipe, CommonModule } from '@angular/common';
import { Editor, NgxEditorModule } from 'ngx-editor';

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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) {}

  editor: Editor;

  currentRun: RunEvent | undefined = undefined;

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

  ngOnInit(): void {
    this.editor = new Editor();

    this.getRun(this.route.snapshot.params["id"]);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
            venueName: data.location.name,
            neighborhood: data.location.neighborhood,
            address: {
              streetAddress: data.location.streetAddress,
              city: data.location.city,
              state: data.location.state,
              zipCode: data.location.zipCode
            },
            eventIds: {
              facebookEventId: data.facebookEventId,
              stravaEventId: data.stravaEventId,
              meetUpEventId: data.meetUpEventId
            }
          });
        },
        error: (e) => console.error(e)
      });
  }

  onSubmit(): void {
    console.log(this.editForm.controls.description.value);
  }
}
