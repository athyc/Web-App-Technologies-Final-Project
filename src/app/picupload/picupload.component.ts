import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Url } from 'url';
import { User } from '../_models';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-picupload',
  templateUrl: './picupload.component.html',
  styleUrls: ['./picupload.component.css']
})


export class PicuploadComponent {
  constructor(private httpClient: HttpClient, private route: ActivatedRoute,private apiService: ApiService, private tokenStorageService: TokenStorageService) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
   url:User;
  switch:boolean = true;
  canView :boolean=false;
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;
    this.canView = (this.tokenStorageService.isLoggedIn()) && (this.tokenStorageService.getUser().id==y)

  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {

    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;

    console.log(this.selectedFile);

    var reader = new FileReader();

    reader.readAsDataURL(this.selectedFile); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed

    }
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/api/upload/' + y, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
  //Gets called when the user clicks on retieve image button to get the image from back end

  getImage() {
    const id = this.route.snapshot.paramMap.get('id');
    var y: number = +id;
    // this.retrievedImage = this.apiService.getPic(y)
    this.apiService.getPic(y).subscribe(
      res => {
        this.url=res;
          if(this.url.picByte==null){
            this.retrievedImage=  null
      }
      this.retrievedImage=  'data:image/jpeg;base64,'+this.url.picByte
      }
    );

    
    //Make a call to Sprinf Boot to get the Image Bytes.
    
  }
}