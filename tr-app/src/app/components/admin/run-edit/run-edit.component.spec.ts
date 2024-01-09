import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunEditComponent } from './run-edit.component';

describe('RunEditComponent', () => {
  let component: RunEditComponent;
  let fixture: ComponentFixture<RunEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
