import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  totalbalance: number = 0;
  agent_arr: any = [];
  player:any;
  keys:any;
  user: firebase.User | null = null;
  constructor(private auth: AngularFireAuth,public ActiveR: ActivatedRoute, public firebaseDatabase: AngularFireDatabase) {
    this.firebaseDatabase.object<S>('players').valueChanges().subscribe((data:any)=>{
      this.player = data;
      this.keys = Object.keys(data);
      for(let i = 0;i<= this.keys.length-1;i++){
        auth.user.subscribe((user) => {
          this.user = user;
        });
        
        this.firebaseDatabase.object('wallets/'+this.keys[i]).valueChanges().subscribe((data:any)=>{
        
          this.player[this.keys[i]].info = data;
          this.player[this.keys[i]].uid = this.keys[i];
       
  
        })
      }
      this.agent_arr = Object.values(data);
      this.totalbalance = this.agent_arr.reduce((acc:any, val:S) => acc + (val.balance || 0), 0);
      console.log(this.agent_arr);
    });
    
  }
 
  onTableDataChange(event: any) {
    this.page = event;
    // this.fetchPosts();
  }
  onTableSizeChange(value:string): void {
    console.log(value)
    this.tableSize = parseInt(value);
    this.page = 1;
    // this.fetchPosts();
  }
  
}
interface S { 
  balance?: number;
  email?: string;
  total_Bet?: number;
  total_Loss?: string;
  total_Winning?: string;
  uid?: string;
  userName?: string;
}
