import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaembedComponent } from './stravaembed.component';

describe('StravaembedComponent', () => {
  let component: StravaembedComponent;
  let fixture: ComponentFixture<StravaembedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StravaembedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StravaembedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
