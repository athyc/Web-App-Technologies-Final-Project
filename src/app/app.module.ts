import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ApprovalpageComponent } from './approvalpage/approvalpage.component';
import { RoomregistrationComponent } from './roomregistration/roomregistration.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatTableDataSource, MatTableModule } from '@angular/material';
import {MatPaginator, MatPaginatorModule} from'@angular/material/paginator'
import { from } from 'rxjs';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DeniedComponent } from './denied/denied.component';
import { AdminboardComponent } from './adminboard/adminboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AmenityPageComponent } from './amenity-page/amenity-page.component';
import { AmenityeditComponent } from './amenityedit/amenityedit.component';
import { UsereditComponent } from './useredit/useredit.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ApprovalpageComponent,
    RoomregistrationComponent,
    SearchresultsComponent,
    DeniedComponent,
    AdminboardComponent,
    MyProfileComponent,
    UserProfileComponent,
    AmenityPageComponent,
    AmenityeditComponent,
    UsereditComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
