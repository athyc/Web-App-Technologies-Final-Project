import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {ApprovalpageComponent} from './approvalpage/approvalpage.component'
import {RoomregistrationComponent} from './roomregistration/roomregistration.component'
import { from } from 'rxjs';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { DeniedComponent } from './denied/denied.component';
import { AdminboardComponent } from './adminboard/adminboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AmenityPageComponent } from './amenity-page/amenity-page.component';
import { AmenityeditComponent } from './amenityedit/amenityedit.component';
import { UsereditComponent } from './useredit/useredit.component';
import { PicuploadComponent } from './picupload/picupload.component';
const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'apc', component : ApprovalpageComponent},
  {path: 'rrc', component: RoomregistrationComponent},
  {path: 'sr', component: SearchresultsComponent},
  {path:'denied', component: DeniedComponent},
  {path:'adminboard',component:AdminboardComponent},
  {path:'myprofile',component:MyProfileComponent},
  {path:'profile/:id',component:UserProfileComponent},
  {path:'amenity/:id',component:AmenityPageComponent},
  {path:'amenityedit/:id',component:AmenityeditComponent},
  {path:'useredit/:id',component:UsereditComponent},
  {path:'picupload/:id',component:PicuploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
