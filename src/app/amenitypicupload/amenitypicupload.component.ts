import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ImageModel } from '../_models/imagemodel';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { ApiService } from '../services/api.service';
import { Amenity } from '../_models/amenity';

@Component({
  selector: 'app-amenitypicupload',
  templateUrl: './amenitypicupload.component.html',
  styleUrls: ['./amenitypicupload.component.css']
})


export class AmenitypicuploadComponent {
  constructor(private httpClient: HttpClient, private router: Router, private tokenStorageService: TokenStorageService, private route: ActivatedRoute, private apiService:ApiService) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: ImageModel[] = [];
  message: string;
  imageName: any;
  morepics: boolean = false;
  canView: boolean;
  amenityid: number
  myItem: Amenity;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;
    this.amenityid = +id;
    this.canView = this.tokenStorageService.isLoggedInAndApprovedHost();
    if (this.canView) {
      this.apiService.getamenity(y).subscribe(item => {
        this.myItem = item; console.log(item);
        if(this.myItem.user.id!=this.tokenStorageService.getUser().id){
          this.canView=false
        }
      })
      
    }

  }
  checkCheckBoxvalue(event) {
    console.log("JNASJ")
    console.log(event.checked)
    this.morepics=event.checked
    console.log(event.checked)
    
  }
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/api/uploadampic/' + this.amenityid, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
    if (this.morepics == true) {
      window.location.reload();

    } else {
      this.router.navigate(['/myprofile'])
    }
  }
  //Gets called when the user clicks on retieve image button to get the image from back end

}