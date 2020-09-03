import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fail } from 'assert';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'sign-up',
  templateUrl: './signup.component.html',
  styleUrls: [ '../app-component/app.component.css']
})
export class SignUpComponent implements OnInit {


  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    let tempUsers = this.apiService.getUNSandEmails()
    tempUsers.subscribe(item => this.userArray = item)
    console.log(this.userArray)
    //this.users$ = this.apiService.getApiUsers()
  }

  signupForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', [Validators.required]),

    passWord: new FormControl('', [Validators.required]),
    passWordConf: new FormControl('', [Validators.required]),

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    picture : new FormControl(''),
    isHost:  new FormControl(false),
    isUser: new FormControl(false),
  });
  userArray = []
  users$: any
  pwm: boolean

  x = "sdfgfgsfg"
  
  getPwm() :boolean{
      return this.pwm
      
  }
  passwordsDontMatch(): void {
    if(this.signupForm.controls.passWord.value == this.signupForm.controls.passWordConf.value){
      this.pwm = false;
    this.signupForm.controls["passWord"].setErrors(null);

    }else{
    this.signupForm.controls["passWord"].setErrors({'incorrect': true});
      this.pwm = true;
    }
  }
  emailExists(): boolean {

    if (this.userArray.map(item => item.email).includes(this.signupForm.controls.userEmail.value)) {
      this.signupForm.controls["userEmail"].setErrors({'incorrect': true});
      return true
    }else{
      return false

    }
    //console.log(this.signupForm.controls.userName.value)

  }
  userNameExists(): boolean {
    console.log(this.userArray.map(item => item.userName))

    if (this.userArray.map(item => item.username).includes(this.signupForm.controls.userName.value)) {
      this.signupForm.controls["userName"].setErrors({'incorrect': true});
      return true
    }else{
      return false
    }
    //console.log(this.signupForm.controls.userName.value)

  }
  existsInDB(userName): boolean {
    console.log(userName)
    this.users$ = this.apiService.getApiUsers()

    return false
  }
  getUser(id: number): void { //Observable<any> {
    this.apiService.getApiUser(id).subscribe(item => console.log(item));
  }

  onSubmit(): void {
    let userRolesArray = []
    if (this.signupForm.controls.isUser.value || !this.signupForm.controls.isHost.value) {
      userRolesArray.push("user")
    }
    if (this.signupForm.controls.isHost.value) {
      userRolesArray.push("host")
    }
    const user = {
      "firstName": this.signupForm.controls.firstName.value,
      "lastName": this.signupForm.controls.lastName.value,
      "username": this.signupForm.controls.userName.value,
      "email" : this.signupForm.controls.userEmail.value,
      "password" : this.signupForm.controls.passWord.value,
      "phoneNumber" : this.signupForm.controls.phoneNumber.value,
      "picture" : this.signupForm.controls.picture.value,
      "role" : userRolesArray,
    }
    
    console.log(user);
    let response = this.authService.register(user).subscribe(item => console.log(item));
    console.log("success!")
    if(this.signupForm.controls.isHost.value){
        this.router.navigate(['/apc'])
    }else{
      this.router.navigate(['/login'])

    }
  }

}
