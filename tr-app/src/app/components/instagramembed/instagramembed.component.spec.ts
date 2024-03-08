import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramembedComponent } from './instagramembed.component';

describe('InstagramembedComponent', () => {
  let component: InstagramembedComponent;
  let fixture: ComponentFixture<InstagramembedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstagramembedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstagramembedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
