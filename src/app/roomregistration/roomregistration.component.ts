import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-roomregistration',
  templateUrl: './roomregistration.component.html',
  styleUrls: ['../app-component/app.component.css']
})
export class RoomregistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  rrf = new FormGroup({
    Name: new FormControl('', [Validators.required,]),
    Description: new FormControl('', [Validators.required]),
    Pets: new FormControl(''),
    Smoking: new FormControl(''),
    Gatherings: new FormControl(''),
    LivingRoom: new FormControl(''),
    Wifi: new FormControl(''),
    AC: new FormControl(''),
    Heater: new FormControl(''),
    Kitchen: new FormControl(''),
    Parking: new FormControl(''),
    TV: new FormControl(''),
    Elevator: new FormControl(''),
    Type: new FormControl('', [Validators.required,]),
    MinPrice: new FormControl('', [Validators.required]),
    RoomNumber: new FormControl('', [Validators.required]),
    BathroomNumber: new FormControl('', [Validators.required]),
  })
  onSubmit(): void { }

}
