import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { Injectable } from '@angular/core';
 import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { ActivatedRoute } from '@angular/router';
import { GamedataService } from '../services/gamedata.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // private url = 'https://jsonplaceholder.typicode.com/posts';
  private url = 'https://us-central1-dicegame-ce163.cloudfunctions.net/addAmount';
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  onlineplayer: Number = 0;
  totalbet: number = 0;

  lastwinningnumber: Number = 0;
  estimatedwinningnumber: Number = 0;
  // sample: string = 'dfb';
  // value_expression: string = 'fsbs';
  des_arr: any = [];
  agent_arr: any = [];
  posts:any;
  interval:any;
  allusers:any;
  CustomiseOutput:any;
  color:any;
  b1:number=0;
  b2:number=0;
  b3:number=0;
  b4:number=0;
  b5:number=0;
  b6:number=0;
  b7:number=0;
  b8:number=0;
  time:any;
  date:any;
  amount:number = 0;
  constructor(public httpClient: HttpClient,public ActiveR: ActivatedRoute, public firebaseDatabase: AngularFireDatabase,private service:GamedataService) {
    if(localStorage.getItem('token') != 'true' && localStorage.getItem('role') != 'admin'){
      location.href='/login';
    }
    this.timer();
   setInterval(() => {
     this.timer();
   }, 1000);
   firebaseDatabase.object('timer').valueChanges().subscribe((data:any)=>{
    this.CustomiseOutput = data.customBet;
    this.color=data.customColour;
   })
    firebaseDatabase.list('players',(ref)=>ref.orderByChild("balance").equalTo(0)).valueChanges().subscribe(s=>{
      console.log("response is -->lkjjkk")
      console.log(s);
      console.log("response is -->lijkljk")
    })
    firebaseDatabase.list<S>('players').valueChanges().forEach(data => {
    this.startTimer()

      data.forEach(s=>{
           this.totalbet = this.totalbet! +  (s.total_Bet!);
          //  console.log(this.totalbalance)
        }
       )
      this.agent_arr = (data)
      console.log(data)
    })
    this.httpClient.get(this.url)
    .subscribe((response) => {
      this.posts = response;
      console.log("response is -->")
      console.log(response);
      console.log("-->response endned ")
    });
     firebaseDatabase.list('users').valueChanges().subscribe(s => {
      this.allusers = s;
      this.allusers.forEach((element: any) => {
        firebaseDatabase.object("wallets/" + element.uid).valueChanges().subscribe((data: any) => {
          element.data = data;
          let sum = 0;
          for (let prop in element.Bet) {
            // Check if the property value is a number
            if (typeof element.Bet[prop] === "number") {
              // Add the property value to the sum
              sum += element.Bet[prop];
            }
          }

          element.tatalbet = sum;
          console.log(this.allusers);
        })
      });

    })

  }
  startTimer() {
    this.interval = setInterval(() => {
      
      this.httpClient.get(this.url)
    .subscribe((response) => {
      this.posts = response;
      console.log("response is -->")
      this.b1=parseInt(response.toString().split(',')[0]) 
      this.b2=parseInt(response.toString().split(',')[1]) 
      this.b3=parseInt(response.toString().split(',')[2]) 
      this.b4=parseInt(response.toString().split(',')[3]) 
      this.b5=parseInt(response.toString().split(',')[4]) 
      this.b6=parseInt(response.toString().split(',')[5]) 
      this.b7=parseInt(response.toString().split(',')[6]) 
      this.b8=parseInt(response.toString().split(',')[7]) 
      this.amount += 1;
      console.log("-->response endned ")
    });
    },5000)
  }

  customBetchange() {
    if (this.CustomiseOutput == '') {
      alert('Please Select and bet Number');
      return
    }
    if (this.color == '') {
      alert('Please Select a color');
      return
    }
    this.firebaseDatabase.object('timer').update({
      customBet: this.CustomiseOutput,
      customColour: this.color,
      isCustom: true
    }).then(() => {
      alert('Custom Bet Set Succesfully');
    })
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

  timer(){
     // Create a new Date object
     const today = new Date();

     // Get the date components
     const date = today.toLocaleDateString(); // e.g. "10/02/2023"
     const time = today.toLocaleTimeString(); // e.g. "11:02:32 AM"
 
     // Combine the date and time components into a summary string
     this.date = date;
 
     this.time = time;
  }
   ngOnInit() {
  
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

// echo "# diceagain" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Vaibhavnanne18/diceagain.git
// git push -u origin main