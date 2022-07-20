import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Component, OnInit } from '@angular/core';
import { FirebaseTSStorage } from "firebasets/firebasetsStorage/firebaseTSStorage";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  selectedImageFile!: File;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor() { }

  ngOnInit(): void {
  }
  onPostClick(commentInput: HTMLTextAreaElement){
    let comment = commentInput.value;
    let postid = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postid, "image"],
        data:{
          data: this.selectedImageFile
        },
        onComplete:(downloadUrl) =>{
          alert(downloadUrl);
        }
      }
    )
  }
  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files![0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result!.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );
  }
}
