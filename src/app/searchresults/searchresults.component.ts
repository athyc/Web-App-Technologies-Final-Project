import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { first } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table';

import { Amenity } from '../_models/amenity';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
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
  constructor(private apiService: ApiService, private router: Router, private tokenStorageService: TokenStorageService) {
    this.dataSource.paginator = this.paginator;
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
  


  }
  clickity(x) {
    console.log(x)
    this.router.navigate(['/amenity/'+x])
  }
}
