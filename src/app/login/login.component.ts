import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: any;
  password: any;
  constructor(public auth: AngularFireAuth, private router: Router, private database: AngularFireDatabase) {

  }
  ngOnInit(){
    if(localStorage.getItem('token') == 'false'){
      location.href = '/home'
    }
    
  }
  login() {
    if (this.email == '') {
      alert('Please enter email')
      return
    }
    if (this.password == '') {
      alert('Please enter password')
      return
    }
    this.auth.signInWithEmailAndPassword(this.email, this.password).then((res) => {
      const uid = res.user?.uid;
      const userRef = this.database.object(`admin/${uid}`);
      userRef.valueChanges().subscribe((userData: any) => {
        // Do something with the user's data
        const data = userData;
        if (data == null) {
          alert('Please enter correct details');
          this.router.navigate(['/login']);
        } else {
          alert('Login Successfully');
          localStorage.setItem('token', 'true');
          localStorage.setItem('role', data.role);
          localStorage.setItem('uid', data.uid);
          // this.router.navigate(['/home']);
          location.href = '/'
        }
      });
      // this.router.navigate(['/dashboard']);
    }, err => {
      alert('something went wrong');
      this.router.navigate(['/login']);
    })
  }
}
