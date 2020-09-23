import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../_models';
import { isNgTemplate } from '@angular/compiler';
import { AnyPtrRecord } from 'dns';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  
  constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    let tempUsers = this.apiService.getUNSandEmails()
    tempUsers.subscribe(item => this.userArray = item)
    console.log(this.userArray)
    this.apiService.getApiUser(this.tokenStorageService.getUser().id).subscribe(item => {console.log(item);
      this.signupForm.controls.userEmail.patchValue(item.email);
      this.signupForm.controls.userName.patchValue(item.username);
      this.premail=item.email;
      this.prpwd=item.passWord;
      this.preusername=item.username;
  
      this.signupForm.controls.firstName.patchValue(item.firstName);
      this.signupForm.controls.lastName.patchValue(item.lastName);
      this.signupForm.controls.phoneNumber.patchValue(item.phoneNumber);});
    // console.log(this.curruser)
    
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
    picture: new FormControl(''),
  
  });
  userArray = []
  users$: any
  pwm: boolean
  curruser: User
  x = "sdfgfgsfg"
  premail:any
  preusername:any
  prpwd:any
  notchanged:boolean=true

  getPwm(): boolean {
    return this.pwm

  }
  passwordsDontMatch(): void {
    if ((this.signupForm.controls.passWord.value == this.signupForm.controls.passWordConf.value) ){
      this.pwm = false;
      this.signupForm.controls["passWord"].setErrors(null);

    } else {
      this.signupForm.controls["passWord"].setErrors({ 'incorrect': true });
      this.pwm = true;
    }
  }
  emailExists(): boolean {

    if (this.userArray.map(item => item.email).includes(this.signupForm.controls.userEmail.value) && this.signupForm.controls.userEmail.value!=this.premail) {
      this.signupForm.controls["userEmail"].setErrors({ 'incorrect': true });
      return true
    } else {
      this.notchanged=false
      return false
      
    }
    //console.log(this.signupForm.controls.userName.value)

  }
  userNameExists(): boolean {
    console.log(this.userArray.map(item => item.userName))

    if (this.userArray.map(item => item.username).includes(this.signupForm.controls.userName.value) && this.signupForm.controls.userName.value!=this.preusername) {
      this.signupForm.controls["userName"].setErrors({ 'incorrect': true });
      return true
    } else {
      this.notchanged=false
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
  changesExist(){
    //if(){

   // }true
  }

  onSubmit(): void {
    let userRolesArray = []
    
    console.log(this.curruser)
    const user = {
      "firstName": this.signupForm.controls.firstName.value,
      "lastName": this.signupForm.controls.lastName.value,
      "username": this.signupForm.controls.userName.value,
      "email": this.signupForm.controls.userEmail.value,
      "password": this.signupForm.controls.passWord.value,
      "phoneNumber": this.signupForm.controls.phoneNumber.value,
      "picture": this.signupForm.controls.picture.value,
      "role": userRolesArray,
    }
window.location.reload()
    console.log(user);
    this.apiService.edituser(user, this.tokenStorageService.getUser().id);
    this.tokenStorageService.signOut();
    location.href="http://localhost:4200/login"
    // let response = this.authService.register(user).subscribe(item => console.log(item));
    this.apiService.edituser(user, this.tokenStorageService.getUser().id);
    
  }
}