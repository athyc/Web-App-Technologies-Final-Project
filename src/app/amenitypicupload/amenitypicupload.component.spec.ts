import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitypicuploadComponent } from './amenitypicupload.component';

describe('AmenitypicuploadComponent', () => {
  let component: AmenitypicuploadComponent;
  let fixture: ComponentFixture<AmenitypicuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitypicuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitypicuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
