import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-roomregistration',
  templateUrl: './roomregistration.component.html',
  styleUrls: ['../app-component/app.component.css']
})
export class RoomregistrationComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private apiService: ApiService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  validateDates(): boolean {
    if (this.toDate == null) {
      this.rrf.controls["FromDate"].setErrors({ 'incorrect': true });
      return true
    } else {
      this.rrf.controls["FromDate"].setErrors(null);
      return false
    }
  }
  ngOnInit() {
  }
  rrf = new FormGroup({
    Name: new FormControl('', [Validators.required,]),

    GeographicAppartment: new FormControl('', [Validators.required,]),
    Region: new FormControl('', [Validators.required,]),
    City: new FormControl('', [Validators.required,]),
    Municipality: new FormControl('', [Validators.required,]),
    Road: new FormControl('', [Validators.required,]),
    Number: new FormControl('', [Validators.required,]),
    ZipCode: new FormControl('', [Validators.required,]),

    Description: new FormControl('', [Validators.required]),
    // Address: new FormControl('', [Validators.required,]),
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
    BedNumber: new FormControl('', [Validators.required]),
    BathroomNumber: new FormControl('', [Validators.required]),
    FromDate: new FormControl('', [Validators.required]),

  })
  onSubmit(): void {
    console.log(this.fromDate)
    console.log(this.toDate)


  }

}
