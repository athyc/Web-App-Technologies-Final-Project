import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Amenity} from './_models/amenity'
@Injectable()
export class ApiService {
    globalUrl = "http://localhost:8080/"
    amenityUrl = "api/amenity"
    userUrl = "http://localhost:8080/users"
    validatingURL = "api/usersEmailAndUsernames"
    constructor(private http: HttpClient) {
    }
    public getUNSandEmails(): Observable<any>{
        console.log("in new function ")
        
            return this.http.get(this.globalUrl + this.validatingURL)
    }
    public getApiUsers(): Observable<any> {
        return this.http
            .get(this.userUrl);
    }
    public getApiUser(id : number): Observable<any> {
        return this.http
            .get(this.userUrl+"/"+id);
    }

    public postApiUser(user): Observable<any> {
        
        return this.http.post(this.userUrl, user);
    }
    public amenity(){
        return this.http.get<Amenity[]>(this.globalUrl+this.amenityUrl)
    }
    // private handleError(error: Response) {
    //     return Observable.throw(error.statusText);
    // }
}
