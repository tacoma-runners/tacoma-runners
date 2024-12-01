import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowonceDialogComponent } from './showonce-dialog.component';

describe('ShowonceDialogComponent', () => {
  let component: ShowonceDialogComponent;
  let fixture: ComponentFixture<ShowonceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowonceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowonceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
