import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Amenity } from '../_models/amenity';

@Component({
  selector: 'app-amenityedit',
  templateUrl: './amenityedit.component.html',
  styleUrls: ['./amenityedit.component.css']
})
export class AmenityeditComponent implements OnInit {
  myItem: Amenity;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  userId: number;
  canView: boolean;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute) {
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
  y:number
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;
    this.y=y
    console.log(y)
    this.canView = this.tokenStorageService.isLoggedInAndApprovedHost();
    if (this.canView) {
      this.apiService.getamenity(y).subscribe(item => {
        this.myItem = item; console.log(item);
        this.rrf.controls.Name.patchValue(item.name);
        this.rrf.controls.GeographicAppartment.patchValue(item.geographicappartment);
        this.rrf.controls.Region.patchValue(item.region);
        this.rrf.controls.City.patchValue(item.city);
        this.rrf.controls.Municipality.patchValue(item.municipality);
        this.rrf.controls.Road.patchValue(item.road);
        this.rrf.controls.Number.patchValue(item.bednumber);
        this.rrf.controls.ZipCode.patchValue(item.zipcode);
        this.rrf.controls.Description.patchValue(item.description);
        this.rrf.controls.Pets.patchValue(item.pets);
        this.rrf.controls.Smoking.patchValue(item.smoking);
        this.rrf.controls.Gatherings.patchValue(item.gatherings);
        this.rrf.controls.LivingRoom.patchValue(item.livingroom);
        this.rrf.controls.Wifi.patchValue(item.wifi);
        this.rrf.controls.AC.patchValue(item.ac);
        this.rrf.controls.Heater.patchValue(item.heater);
        this.rrf.controls.Kitchen.patchValue(item.kitchen);
        this.rrf.controls.Parking.patchValue(item.parking);
        this.rrf.controls.TV.patchValue(item.tv);
        this.rrf.controls.Elevator.patchValue(item.elevator);
        this.rrf.controls.Type.patchValue(item.type);
        this.rrf.controls.MinPrice.patchValue(item.minprice);
        this.rrf.controls.RoomNumber.patchValue(item.roomnumber);
        this.rrf.controls.BedNumber.patchValue(item.bednumber);
        this.rrf.controls.BathroomNumber.patchValue(item.bathroomnumber);
        this.rrf.controls.FromDate.patchValue(item.fromdate);

      })
    }
  }
  rrf = new FormGroup({
    Name: new FormControl('',),

    GeographicAppartment: new FormControl('',),
    Region: new FormControl('',),
    City: new FormControl('',),
    Municipality: new FormControl('',),
    Road: new FormControl('',),
    Number: new FormControl('',),
    ZipCode: new FormControl('',),

    Description: new FormControl('',),
    // Address: new FormControl('', ),
    Pets: new FormControl(),
    Smoking: new FormControl(),
    Gatherings: new FormControl(),
    LivingRoom: new FormControl(),
    Wifi: new FormControl(),
    AC: new FormControl(),
    Heater: new FormControl(),
    Kitchen: new FormControl(),
    Parking: new FormControl(),
    TV: new FormControl(),
    Elevator: new FormControl(),
    Type: new FormControl('',),
    MinPrice: new FormControl('',),
    RoomNumber: new FormControl('',),
    BedNumber: new FormControl('',),
    BathroomNumber: new FormControl('',),
    FromDate: new FormControl('',),

  })
  clickity() {

  }
  onSubmit(): void {
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
      "fromdate": this.myItem.fromdate,
      "todate": this.myItem.todate,
    }

    console.log(newAmenity)

    this.apiService.putAmenity(newAmenity, this.y);
    this.router.navigate(['/myprofile'])
  }

}

const ngbDateToString = (ngbdate): string => {
  return `${ngbdate.year}-${`${ngbdate.month - 1}`.padStart(2, '0')}-${`${ngbdate.day}`.padStart(2, '0')}`
}
