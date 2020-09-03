import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { first } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';

import { Amenity } from '../_models/amenity';
import { from } from 'rxjs';
@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['../app-component/app.component.css']
})

export class SearchresultsComponent implements OnInit {
  displayedColumns: string[] = ['name',
  'geographicappartment',
  'region',
  'city',
  'municipality',
  'parking',
  'type',
  'minprice',
  'roomnumber',
  'bathroomnumber'
];
  constructor(private apiService: ApiService) {
    this.dataSource.paginator = this.paginator;
    console.log(AMENITIES)
  }

  dataSource = new MatTableDataSource<Amenity>();
  amenities: Amenity[] = []

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

    this.apiService.amenity().pipe(first())
      .subscribe(amenities => {
        this.amenities = amenities
        this.dataSource.data = amenities
        this.dataSource.paginator = this.paginator
      });
    console.log(this.amenities)
    // this.amenities.forEach((def: Amenity)=>{AMENITIES.push(def)})
    console.log(AMENITIES)


  }
  clickity(x) {
    console.log(x)
  }
}
let AMENITIES: Amenity[] = [{
  id: 1,
  name: "somevalue",
  geographicappartment: "somevaldsfsue",
  region: "somevalue",
  city: "somevalue",
  municipality: "somevalue",
  road: "somevalue",
  number: 1,
  zipcode: 1,
  description: "somevalue",
  pets: true,
  smoking: true,
  gatherings: true,
  livingroom: true,
  wifi: true,
  ac: true,
  heater: true,
  kitchen: true,
  parking: true,
  tv: true,
  elevator: true,
  type: "somevalue",
  minprice: 1,
  roomnumber: 1,
  bathroomnumber: 1,
  fromdate: "somevalue",
  todate: "somevalue",
},];