import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private fireauth:AngularFireAuth){}
  ngOnInit(){
    if(localStorage.getItem('token') != 'true' && localStorage.getItem('role') != 'admin'){
      location.href='/login';
    }
  }
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('role');
      location.href='/login';
    }, err => {
      alert(err.message);
    })
  }
}
