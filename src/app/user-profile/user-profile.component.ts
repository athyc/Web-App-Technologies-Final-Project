import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  canView: boolean;
  userdet: User
  url: User;
  retrievedImage: any;
  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute, private router: Router) { }
  rrf = new FormGroup({

    Message: new FormControl('',),
  })
  usersid:number
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;
    this.usersid = y
    this.canView = this.tokenStorageService.isLoggedInUser()
    if (this.tokenStorageService.getUser().id == y) {
      this.router.navigate(['/myprofile'])
    }
    if (this.canView) {
      this.apiService.getApiUser(y).subscribe(item => { this.userdet = item; console.log(item) })
      this.retrievedImage = this.apiService.getPic(y).subscribe(
        res => {
          this.url = res;
          if (this.url.picByte == null) {
            this.retrievedImage = null
          } else {
            this.retrievedImage = 'data:image/jpeg;base64,' + this.url.picByte

          }
        }
      );

    }
    console.log(id)
  }
  onSubmit() {
    let now = new Date();
    let a = formatDate(new Date(), 'yyyy-MM-ddThh:mm:ss', 'en-US')
    const m = {
        "date":a,
        "text":this.rrf.controls.Message.value
    }
    this.apiService.postmsg(this.tokenStorageService.getUser().id,this.usersid,m)
    window.location.reload();
  }
  
}
const ngbDateToString = (ngbdate): string => {
  return `${ngbdate.year}-${`${ngbdate.month }`.padStart(2, '0')}-${`${ngbdate.day}`.padStart(2, '0')}`
}