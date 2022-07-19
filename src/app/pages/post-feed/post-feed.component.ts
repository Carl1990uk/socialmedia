import { CreatePostComponent } from './../../tools/create-post/create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent)

  }
}
