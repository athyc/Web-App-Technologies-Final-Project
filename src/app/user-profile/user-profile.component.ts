import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  canView: boolean;
  userdet: User

  constructor(private apiService: ApiService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;

    this.canView = this.tokenStorageService.isLoggedInUser()
    if(this.tokenStorageService.getUser().id == y){
      this.router.navigate(['/myprofile'])
    }
    if (this.canView) {
      this.apiService.getApiUser(y).subscribe(item => { this.userdet = item; console.log(item) })
      
    }
    console.log(id)
  }
  
}
