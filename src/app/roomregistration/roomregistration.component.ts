import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-roomregistration',
  templateUrl: './roomregistration.component.html',
  styleUrls: ['../app-component/app.component.css']
})
export class RoomregistrationComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  userId: number;
  canView: boolean;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private apiService: ApiService, private tokenStorageService: TokenStorageService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.userId = this.tokenStorageService.getUser()?.id;
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
    this.canView = this.tokenStorageService.isLoggedInAndApprovedHost();
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
    Pets: new FormControl(false),
    Smoking: new FormControl(false),
    Gatherings: new FormControl(false),
    LivingRoom: new FormControl(false),
    Wifi: new FormControl(false),
    AC: new FormControl(false),
    Heater: new FormControl(false),
    Kitchen: new FormControl(false),
    Parking: new FormControl(false),
    TV: new FormControl(false),
    Elevator: new FormControl(false),
    Type: new FormControl('', [Validators.required,]),
    MinPrice: new FormControl('', [Validators.required]),
    RoomNumber: new FormControl('', [Validators.required]),
    BedNumber: new FormControl('', [Validators.required]),
    BathroomNumber: new FormControl('', [Validators.required]),
    FromDate: new FormControl('', [Validators.required]),

  })
  clickity() {
    console.log("fd")
    console.log(this.fromDate)
    console.log("td")
    console.log(this.toDate)
  }
  onSubmit(): void {
    console.log(this.fromDate)
    console.log(this.toDate)


    const newAmenity = {
      "name": this.rrf.controls.Name.value,
      "geographicappartment": this.rrf.controls.GeographicAppartment.value,
      "region": this.rrf.controls.Region.value,
      "city": this.rrf.controls.City.value,
      "municipality": this.rrf.controls.Municipality.value,
      "road": this.rrf.controls.Road.value,
      "number": this.rrf.controls.Number.value,
      "zipcode": this.rrf.controls.ZipCode.value,
      "description": this.rrf.controls.Description.value,
      "pets": this.rrf.controls.Pets.value,
      "smoking": this.rrf.controls.Smoking.value,
      "gatherings": this.rrf.controls.Gatherings.value,
      "livingroom": this.rrf.controls.LivingRoom.value,
      "wifi": this.rrf.controls.Wifi.value,
      "ac": this.rrf.controls.AC.value,
      "heater": this.rrf.controls.Heater.value,
      "kitchen": this.rrf.controls.Kitchen.value,
      "parking": this.rrf.controls.Parking.value,
      "tv": this.rrf.controls.TV.value,
      "elevator": this.rrf.controls.Elevator.value,
      "type": this.rrf.controls.Type.value,
      "minprice": this.rrf.controls.MinPrice.value,
      "roomnumber": this.rrf.controls.RoomNumber.value,
      "bednumber": this.rrf.controls.BedNumber.value,
      "bathroomnumber": this.rrf.controls.BathroomNumber.value,
      "fromdate": ngbDateToString(this.fromDate),
      "todate": ngbDateToString(this.toDate),
    }

    console.log(newAmenity)

    this.apiService.postAmenity(newAmenity, this.userId);
  }

}

const ngbDateToString = (ngbdate): string => {
  return `${ngbdate.year}-${`${ngbdate.month - 1}`.padStart(2, '0')}-${`${ngbdate.day}`.padStart(2, '0')}`
}
