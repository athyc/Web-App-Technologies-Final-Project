import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { PicuploadComponent } from './picupload/picupload.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map-component/map.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AmenityTableComponent } from './amenity-table/amenity-table.component';
import en from '@angular/common/locales/en';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AmenitypicuploadComponent } from './amenitypicupload/amenitypicupload.component';

registerLocaleData(en);

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
    UsereditComponent,
    PicuploadComponent,
    MapComponent,
    AmenityTableComponent,
    AmenitypicuploadComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    LeafletModule,
    NzTableModule,
    ScrollingModule
  ],
  providers: [
    authInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
