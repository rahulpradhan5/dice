import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { object } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.css']
})
export class PlayerdetailsComponent {

  player:any;
  keys:any;
  constructor(public ActiveR: ActivatedRoute, public firebaseDatabase: AngularFireDatabase) {
    this.firebaseDatabase.object('players').valueChanges().subscribe((data:any)=>{
      this.player = data;
      this.keys = Object.keys(data);
      
    })
    for(let i = 0;i<=this.keys.length-1;i++){
      this.firebaseDatabase.object('wallets/'+this.keys[i]).valueChanges().subscribe((data:any)=>{
       
        console.log(this.player[this.keys[i]]);
      })
  }
  }
}
