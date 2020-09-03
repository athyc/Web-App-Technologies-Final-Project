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
    userUrl = "/users"
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

    public amenity() {
        return this.http.get<Amenity[]>(this.globalUrl + this.amenityUrl)
    }

    public postAmenity(amenity, userId) {
        return this.http.post(this.globalUrl + this.amenityUrl + '/' + userId + '/newamenity', amenity).subscribe(item => console.log(item))
    }

    // private handleError(error: Response) {
    //     return Observable.throw(error.statusText);
    // }
}
