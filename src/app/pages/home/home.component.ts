import { AuthenticatorComponent } from './../../tools/authenticator/authenticator.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  onGetStartedclick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}
