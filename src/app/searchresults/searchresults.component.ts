import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { first, map } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';

import { Amenity } from '../_models/amenity';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['../app-component/app.component.css']
})
export class SearchresultsComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private tokenStorageService: TokenStorageService, private route: ActivatedRoute) {
  }

  amenities: Amenity[] = []
  searchData = {};

  ngOnInit() {
    //this.amenities = TestAmenities

    this.route.paramMap.pipe(map(() => window.history.state)).subscribe(state => {
      this.searchData = state.searchData
      console.log(state.searchData)

      const queryString = `?fromdate=${state.searchData.fromdate}&todate=${state.searchData.todate}&lat=${state.searchData.lat}&lon=${state.searchData.lon}`
      this.apiService.amenityFiltered(queryString).pipe(first())
        .subscribe(amenities => {
          this.amenities = amenities
          console.log(this.amenities)
        });
    })
  }
}

const TestAmenities: Amenity[] = [
  {
    id: 42,
    name: 'string',
    geographicappartment: 'string',
    region: 'string',
    city: 'string',
    municipality: 'string',
    road: 'string',
    number: 2,
    zipcode: 3,
    description: 'string',
    pets: true,
    smoking: true,
    gatherings: false,
    livingroom: false,
    wifi: true,
    ac: false,
    heater: false,
    kitchen: true,
    parking: true,
    tv: false,
    elevator: true,
    type: 'string',
    minprice: 5,
    roomnumber: 1,
    bathroomnumber: 1,
    bednumber: 35,
    fromdate: 'string',
    todate: 'string',
    lat: 37,
    lon: 23,
  },
  {
    id: 43,
    name: 'other',
    geographicappartment: 'string',
    region: 'not',
    city: 'this',
    municipality: 'one',
    road: 'string',
    number: 1,
    zipcode: 5,
    description: 'string',
    pets: false,
    smoking: true,
    gatherings: false,
    livingroom: false,
    wifi: false,
    ac: true,
    heater: false,
    kitchen: true,
    parking: true,
    tv: false,
    elevator: true,
    type: 'string',
    minprice: 5,
    roomnumber: 5,
    bathroomnumber: 0,
    bednumber: 35,
    fromdate: 'string',
    todate: 'string',
    lat: 38,
    lon: 24,
  }
]
