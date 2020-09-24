import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ApiService } from '../services/api.service';
import { User } from '../_models';
import { first } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Amenity } from '../_models/amenity';
import { Router } from '@angular/router';
import { Roles } from '../services/token-storage.service';
import { Message } from '../_models/message';
//import { ConsoleReporter } from 'jasmine';
//import { Console } from 'console';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css', '../app-component/app.component.css']
})
export class MyProfileComponent implements OnInit {
  showAmenities: boolean;
  displayedColumns: string[] = ['name',
    'geographicappartment',
    'region',
    'city',
    'municipality',
    'parking',
    'type',
    'minprice',
    'roomnumber',
    'bathroomnumber',
    'buttons'
  ];
  dataSource = new MatTableDataSource<Amenity>();
  amenities: Amenity[] = []

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isLoggedIn: boolean;
  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router) {
    this.dataSource.paginator = this.paginator;
  }
  canView: boolean
  retrievedImage: any;

  userid: number;
  userdet: User;
  host: boolean;
  roles: string[] = [];
  url: User;
  messages: Message[]=[];
  newl:string="\n______________________________________________________________________________"
  ngOnInit(): void {
    
    console.log(this.router.url)
    
    this.showAmenities = this.tokenStorageService.isLoggedInAndApprovedHost()
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.canView = this.tokenStorageService.isLoggedInUser()
    if (this.isLoggedIn) {
      this.apiService.getmsgs(this.tokenStorageService.getUser().id).pipe(first()).subscribe(item=>{this.messages = item})
      this.userid = this.tokenStorageService.getUser().id
      // console.log(this.userid)
      this.apiService.getApiUser(this.userid).subscribe(item => { this.userdet = item; console.log(item) })
      this.retrievedImage = this.apiService.getPic(this.userid).subscribe(
        res => {
          this.url = res;
          if (this.url.picByte == null) {
            this.retrievedImage = null
          }else{
            this.retrievedImage = 'data:image/jpeg;base64,' + this.url.picByte

          }
        }
      );

      //this.host=this.isHost(this.userdet.roles);
      this.roles = this.tokenStorageService.getUser().roles;
      this.roles.forEach(element => {
        if (this.roles.includes(Roles.Host)) {
          this.host = true;
        }
      });
      
    }
    if (this.showAmenities) {
      this.apiService.getUserAmenities(this.tokenStorageService.getUser().id).pipe(first())
        .subscribe(amenities => {
          this.amenities = amenities
          this.dataSource.data = amenities
          this.dataSource.paginator = this.paginator
        });
    }
  }
  editProfile() {
    this.router.navigate(['/useredit/' + this.userid])
  }
  editAmenity(id, amenity) {
    this.router.navigate(['/amenityedit/' + id])
  }
  deleteRow(id) {
    this.apiService.delAmenity(id)
    window.location.reload();
  }

  goelse() {
    location.href = "http://localhost:4200/rrc";
  }

  getreviews() {

  }
}
