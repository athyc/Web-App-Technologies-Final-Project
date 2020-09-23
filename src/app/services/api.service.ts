import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenity } from '../_models/amenity'
import { TokenStorageService } from './token-storage.service';
import { User } from '../_models/user'
import { Review } from '../_models/review';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    globalUrl = "http://localhost:8080/api"
    amenityUrl = "/amenity"
    useramenityUrl = "/useramenity"
    editamenity="/editamenity"
    userUrl = "/users"
    hostAprroval = "/hostApproval"
    validatingURL = "/usersEmailAndUsernames"
    reviewUrl="/reviews"
    constructor(private http: HttpClient) {
    }

    public getUNSandEmails(): Observable<any> {
        console.log("in new function ")

        return this.http.get(this.globalUrl + this.validatingURL)
    }
    public getApiUsers(): Observable<any> {
        return this.http
            .get(this.globalUrl + this.userUrl);
    }
    public getApiUser(id: number): Observable<any> {
        return this.http
            .get(this.globalUrl + this.userUrl + "/" + id);
    }

    public postApiUser(user): Observable<any> {

        return this.http.post(this.globalUrl + this.userUrl, user);
    }
    public edituser(user,uid){
        return this.http.put(this.globalUrl+this.userUrl+'/'+uid,user).subscribe(item => console.log(item))
    }

    public amenity() {
        return this.http.get<Amenity[]>(this.globalUrl + this.amenityUrl)
    }
    public amenityFiltered(queryString) {
        return this.http.get<Amenity[]>(this.globalUrl + this.amenityUrl + '/filtered' + queryString)
    }

    public getUserAmenities(id){
        return this.http.get<Amenity[]>(this.globalUrl + this.useramenityUrl+'/'+id)
    }
    public getamenity(id) {
        return this.http.get<Amenity>(this.globalUrl + this.amenityUrl+'/'+id)
    }

    public postAmenity(amenity, userId) {
        return this.http.post(this.globalUrl + this.amenityUrl + '/' + userId + '/newamenity', amenity).subscribe(item => console.log(item))
    }
    public putAmenity(amenity, id){
        return this.http.put(this.globalUrl+this.editamenity+'/'+id,amenity).subscribe(item => console.log(item))
    }
    public delAmenity(id){
        return this.http.delete(this.globalUrl+this.amenityUrl+'/'+id).subscribe(item => console.log(item))
    }
    public deleteuser(id){
        console.log("here")
        return this.http.delete(this.globalUrl+this.userUrl+'/'+id).subscribe(item => console.log(item))
    }
    public putuser(id, user){
        console.log("here!")

        return this.http.put(this.globalUrl+this.hostAprroval+'/'+id,user).subscribe()
    }
    public imgupload(id){

    }
    public getPic(id){
        return this.http.get<User>('http://localhost:8080/api/getimage/' + id)
      
    //   if(this.url.picByte==null){
    //       return null
    //   }
    //   return  'data:image/jpeg;base64,'+this.url.picByte
    }
    public getbookings(): Observable<any>{
        return this.http.get(this.globalUrl+"/bookings")
    }

    public getxml(){

        return this.http.get(this.globalUrl+"/xmlexport",{ responseType: 'text'});
    }

    //public getApiAmenities(): Observable<any> {
        //return this.http.get(this.globalUrl+);
        
    //}

    public getreviews(id): Observable<any> {
        return this.http.get<Review[]>(this.globalUrl+this.amenityUrl+"/"+id);
    }
    public postReview(uid,aid,review){
        this.http.post(this.globalUrl+this.reviewUrl+"/user/"+uid+"/amenity/"+aid,review).subscribe(item => console.log(item))
    }
    // private handleError(error: Response) {
    //     return Observable.throw(error.statusText);
    // }
}
