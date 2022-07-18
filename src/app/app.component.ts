import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialmedia';
  constructor(private loginSheet: MatBottomSheet){

  }
  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}
