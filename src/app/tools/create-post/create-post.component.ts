import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
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
  constructor(private dialog: MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
  }
  onPostClick(commentInput: HTMLTextAreaElement){
    let comment = commentInput.value;
    if(comment.length<=0) return;
    if(this.selectedImageFile){
      this.uploadImagePost(comment);
    }else{
      this.uploadImagePost(comment);
    }
    
  }
  uploadImagePost(comment: string){
    let postid = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postid, "image"],
        data:{
          data: this.selectedImageFile
        },
        onComplete:(downloadUrl) =>{
          this.firestore.create(
            {
              path:["Posts", postid],
              data:{
                comment: comment,
                creatorid: this.auth.getAuth().currentUser?.uid,
                imageUrl: downloadUrl,
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
              },
              onComplete: (docid) =>{
                this.dialog.close();
              }
            }
          );
        }
      }
    );
  }
  uploadPosts(comment: string){
    this.firestore.create(
      {
        path:["Posts", ],
        data:{
          comment: comment,
          creatorid: this.auth.getAuth().currentUser?.uid,
         
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docid) =>{
          this.dialog.close();
        }
      }
    );
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
