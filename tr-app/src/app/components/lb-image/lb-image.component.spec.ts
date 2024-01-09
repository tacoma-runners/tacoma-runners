import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbImageComponent } from './lb-image.component';

describe('LbImageComponent', () => {
  let component: LbImageComponent;
  let fixture: ComponentFixture<LbImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LbImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LbImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
