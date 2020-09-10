import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Amenity } from '../_models/amenity'
import { TokenStorageService } from './token-storage.service';

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
    public getbookings(): Observable<any>{
        return this.http.get(this.globalUrl+"/bookings")
    }

    public getxml(){

        return this.http.get(this.globalUrl+"/xmlexport",{ responseType: 'text'});
    }
    // private handleError(error: Response) {
    //     return Observable.throw(error.statusText);
    // }
}
