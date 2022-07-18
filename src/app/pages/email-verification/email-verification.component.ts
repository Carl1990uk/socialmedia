import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  auth = new FirebaseTSAuth();
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(
      this.auth.isSignedIn()&&
      (!this.auth.isEmailVerified())
    ){
      this.auth.sendVerificationEmail();
    } else{
      this.router.navigate([""]);
    }
  }

  onResendClick(){
    this.auth.sendVerificationEmail();
  }

}
