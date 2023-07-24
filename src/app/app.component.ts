import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  isLoginPage: boolean=false;
  constructor(){
    if(localStorage.getItem('token') == 'true'){
      this.isLoginPage = true;
    }
  }
 

}
