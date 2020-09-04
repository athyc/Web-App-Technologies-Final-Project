import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityPageComponent } from './amenity-page.component';

describe('AmenityPageComponent', () => {
  let component: AmenityPageComponent;
  let fixture: ComponentFixture<AmenityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
