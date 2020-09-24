import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Amenity } from '../_models/amenity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../_models/review';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {formatDate} from '@angular/common';
import { map } from 'rxjs/operators';
import { ImageModel } from '../_models/imagemodel';
import { HttpClient, HttpEventType } from '@angular/common/http';

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
  searchData;
    retrieveResonse: ImageModel[]= [];

  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute,private httpClient: HttpClient) { }
  ngOnInit(): void {
    
    this.canView = this.tokenStorageService.isLoggedInUser()
    if (this.canView) {
      const id = this.route.snapshot.paramMap.get('id');
      var y: number = +id;
      this.amenityid=+id;

      this.apiService.getamenity(y).subscribe(item => { this.myItem = item; console.log(item) })
      this.apiService.getreviews(this.amenityid).subscribe(n => {this.reviews=n; console.log(n) })
      this.httpClient.get<ImageModel[]>('http://localhost:8080/api/get/'+this.amenityid)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          for(let r of this.retrieveResonse){
            console.log(r)
            r.picByte = 'data:image/jpeg;base64,' + r.picByte
          }
        }
      );
      if(this.retrieveResonse === undefined || this.retrieveResonse.length == 0){
        console.log("WHY HAVE YOU FORSAKEN ME")
        //add default image saying no photos avail! andor bool
      }
    }

    this.route.paramMap.pipe(map(() => window.history.state)).subscribe(state => {
      this.searchData = state.searchData
      
    })
  }
  clickity() {
    //todo add bookings and reviews
    console.log(this.searchData.fromdate)
    console.log(this.searchData.todate)
    console.log(this.amenityid)
    console.log(this.tokenStorageService.getUser()?.id)
    const b = {
      "fromdate" : this.searchData.fromdate,
      "todate" : this.searchData.todate,
      
    }
    this.apiService.newbooking(this.tokenStorageService.getUser()?.id,this.amenityid,b)
    this.router.navigate(['/myprofile'])
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
