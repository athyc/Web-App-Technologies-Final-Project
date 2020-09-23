import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string;
  name: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, public formatter: NgbDateParserFormatter, private calendar: NgbCalendar) {
  }
  rrf = new FormGroup({

    FromDate: new FormControl('', ),
    Lon: new FormControl('',[Validators.required]),
    Lat: new FormControl('',[Validators.required]),
    })
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  hoveredDate: NgbDate | null = null;

  validateDates(): boolean {
    if (this.toDate == null) {
      this.rrf.controls["FromDate"].setErrors({ 'incorrect': true });
      return true
    } else {
      this.rrf.controls["FromDate"].setErrors(null);
      return false
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  myProfile() {
    this.router.navigate(['/myprofile'])
  }

  onSubmit() {
    const a ={
      "fromdate": ngbDateToString(this.fromDate),
      "todate": ngbDateToString(this.toDate),
      "lon":this.rrf.controls.Lon.value,
      "lat":this.rrf.controls.Lat.value
    }
    console.log(a)
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
  clickity() {
    console.log(this.rrf.controls.Region.value)
    window.open('https://www.latlong.net/')
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
  searchAmenity(input: string) {
    document.getElementById(name);
    console.log(document.getElementById(name));
    // window.location.reload();
  }
}
const ngbDateToString = (ngbdate): string => {
  return `${ngbdate.year}-${`${ngbdate.month - 1}`.padStart(2, '0')}-${`${ngbdate.day}`.padStart(2, '0')}`
}
