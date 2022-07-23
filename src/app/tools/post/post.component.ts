import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { PostData } from 'src/app/pages/post-feed/post-feed.component'
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData!: PostData;
  creatorName?: string;
  creatorDescription?: string;
  firestore = new FirebaseTSFirestore();
  constructor() {}

  ngOnInit(): void {
   this.getCreatorInfo();
  }

  async getCreatorInfo(){
    await this.firestore.getDocument(
      {
        path: ["Users.", this.postData.creatorId],
        
        onComplete: result => {
          let userDocument = result.data();
          alert(userDocument);
          this.creatorName = userDocument!.publicName;
          this.creatorDescription = userDocument!.description;
        }
      }
    );
  }

}


