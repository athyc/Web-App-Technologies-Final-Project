import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Amenity } from '../_models/amenity';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-amenity-page',
  templateUrl: './amenity-page.component.html',
  styleUrls: ['./amenity-page.component.css']
})
export class AmenityPageComponent implements OnInit {
  canView: boolean;
  myItem: Amenity;
  rrf = new FormGroup({})
  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.canView = this.tokenStorageService.isLoggedInUser()
    if (this.canView) {
      const id = this.route.snapshot.paramMap.get('id');
      var y: number = +id;
      this.apiService.getamenity(y).subscribe(item => { this.myItem = item; console.log(item) })
    }
  }
  clickity() {
    //todo add bookings and reviews
  }
  onSubmit(){
    
  }
}
