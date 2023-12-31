import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saturday5kComponent } from './saturday5k.component';

describe('Saturday5kComponent', () => {
  let component: Saturday5kComponent;
  let fixture: ComponentFixture<Saturday5kComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Saturday5kComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Saturday5kComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
