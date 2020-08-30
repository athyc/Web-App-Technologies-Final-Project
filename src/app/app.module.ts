import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ApprovalpageComponent } from './approvalpage/approvalpage.component';
import { RoomregistrationComponent } from './roomregistration/roomregistration.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ApprovalpageComponent,
    RoomregistrationComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
