import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {ApprovalpageComponent} from './approvalpage/approvalpage.component'
import {RoomregistrationComponent} from './roomregistration/roomregistration.component'
import { from } from 'rxjs';
const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'apc', component : ApprovalpageComponent},
  {path: 'rrc', component: RoomregistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
