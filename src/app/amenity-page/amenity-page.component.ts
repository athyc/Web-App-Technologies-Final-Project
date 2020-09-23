import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Amenity } from '../_models/amenity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../_models/review';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-amenity-page',
  templateUrl: './amenity-page.component.html',
  styleUrls: ['./amenity-page.component.css','../app-component/app.component.css']
})
export class AmenityPageComponent implements OnInit {
  canView: boolean;
  myItem: Amenity;
  reviews:Review[]
  rrf = new FormGroup({
    reviewText : new FormControl('',[]),
    reviewNum: new FormControl(5,)
  })
  amenityid:number
  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.canView = this.tokenStorageService.isLoggedInUser()
    if (this.canView) {
      const id = this.route.snapshot.paramMap.get('id');
      var y: number = +id;
      this.amenityid=+id;

      this.apiService.getamenity(y).subscribe(item => { this.myItem = item; console.log(item) })
      this.apiService.getreviews(this.amenityid).subscribe(n => {this.reviews=n; console.log(n) })
    }
  }
  clickity() {
    //todo add bookings and reviews
    
  }
  userid: number;
  r:Review
  onSubmit(){
    
    const review = {
      "rating":this.rrf.controls.reviewNum.value,
      "reviewtext":this.rrf.controls.reviewText.value,
      "reviewdate":formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    this.apiService.postReview(this.tokenStorageService.getUser().id,this.amenityid,review)
    
  }

  review:Review[]=[]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 


  message(){
    
  }
}
