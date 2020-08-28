import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  i = 0;

  title = 'angular-take3';

  userUrl = "http://localhost:8080/users"

  constructor(private apiService: ApiService) { }

  getUsers(): void { //Observable<any> {
    this.apiService.getApiUsers().subscribe(item => console.log(item));
  }
  postUser(user) {
    user = {
      "firstName": "Bilbo",
      "lastName": "Baggins",
      "username": "bilbob" + this.i
    }
    this.i++;
    this.apiService.postApiUser(user).subscribe(item => console.log(item));
  }


}
