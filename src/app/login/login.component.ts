import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private apiService: ApiService, private tokenStorage: TokenStorageService, private router: Router) { }
  
  userArray = []
  isLoggedIn = !!this.tokenStorage.getToken();
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  ngOnInit() {
    let tempUsers = this.apiService.getUNSandEmails()
    tempUsers.subscribe(item => this.userArray = item)
    if (this.isLoggedIn) {
      this.router.navigate(['/'])
    }
  }
  loginform = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    passWord: new FormControl('', [Validators.required]),
  })
  emailExists(): boolean {
    
    if(this.loginform.controls["userName"].value == ""){
      return true
    }
    if (this.userArray.map(item => item.username).includes(this.loginform.controls.userName.value)) {
      return true
    }else{
      this.loginform.controls["userName"].setErrors({'incorrect': true});
      return false

    }
    //console.log(this.signupForm.controls.userName.value)

  }

  onSubmit(): void {
    this.authService.login(
      { username: this.loginform.controls.userName.value, password: this.loginform.controls.passWord.value }
      ).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
