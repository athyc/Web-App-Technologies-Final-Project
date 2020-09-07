import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ApiService } from '../services/api.service';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { Booking } from '../_models/booking';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['../app-component/app.component.css']
})
export class AdminboardComponent implements OnInit {
  canView: boolean;
  dataSource = new MatTableDataSource<User>();

  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService) {
    this.dataSource.paginator = this.paginator;

  }
  users: User[] = []

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'roles', 'hostApproved', 'buttons']
  ngOnInit(): void {
    this.canView = this.tokenStorageService.isLoggedInAdmin();
    if (this.canView) {
      this.apiService.getApiUsers().pipe(first()).subscribe(amenities => {
        this.users = amenities
        this.dataSource.data = amenities
      });



    }
  }
  deleteRow(id) {
    this.apiService.deleteuser(id)
  }
  approveHost(id, user) {
    console.log("what")
    console.log(user)
    let postable = {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "username": user.userName,
      "email": user.userEmail,
      "password": user.passWord,
      "phoneNumber": user.phoneNumber,
      "role": user.roles,
    }
    this.apiService.putuser(id, postable)
  }
  isHost(a): boolean {
    let rv = false
    a.forEach(element => {
      if (element.name == 'ROLE_HOST') {
        rv = true
      }
    });

    return rv
  }
  print(a): string {
    let b = ''

    a.forEach(element => {

      b = b + element.name + '\n'
    });
    return b

  }
  booking: Booking[]=[]
  getBookings(){
    this.apiService.getbookings().pipe(first()).subscribe(item=>{console.log(item);this.booking=item})
    console.log(this.booking[0].id)
  }
  path:string
  xmlexporter(){
    this.apiService.getxml().subscribe(item=>{console.log(item);this.path=item.toString()});
    console.log(this.path)
  }
}
let DATA = []