import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userArray = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let tempUsers = this.apiService.getApiUsers()
    tempUsers.subscribe(item => this.userArray = item)
  }
  loginform = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    passWord: new FormControl('', [Validators.required]),
  })
  emailExists(): boolean {
    
    if(this.loginform.controls["userEmail"].value == ""){
      return true
    }
    if (this.userArray.map(item => item.email).includes(this.loginform.controls.userEmail.value)) {
      return true
    }else{
      this.loginform.controls["userEmail"].setErrors({'incorrect': true});
      return false

    }
    //console.log(this.signupForm.controls.userName.value)

  }
  onSubmit(): void {

  }
}
