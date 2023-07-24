import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pendingwithdrawals',
  templateUrl: './pendingwithdrawals.component.html',
  styleUrls: ['./pendingwithdrawals.component.css']
})
export class PendingwithdrawalsComponent {
  wallet_arr: any = [];
  w_arr?: any = [];
  count?: number = 0;
  allData: any[] = [];
  new: any[] = [];
  objects: any[]=[];
  constructor(public ActiveR: ActivatedRoute, public firebaseDatabase: AngularFireDatabase) {
    this.loadData();
    firebaseDatabase.list<S>('withdraw-request').valueChanges().forEach(data => {
      // console.log("data" +data)
      data.forEach(s => {

        if (s.status == 'pending') {
          this.count = this.count! + parseInt(s.amount!);
          this.w_arr?.push(s);
          // console.log(this.w_arr)
        }
        // console.log(this.w_arr)
      })

      // for (let user of data) {
      //   console.log ("Block statement execution no." +  user);
      // }
    }).then((s) => {

      // console.log("Hello vaibhav" +this.w_arr);
    })
    // console.log(this.w_arr)
  }



  loadData() {
    this.allData=[];
    this.new=[];
    this.objects=[];
    this.firebaseDatabase.object('wallets').valueChanges().pipe(take(1)).subscribe((data: any) => {
      this.allData = data;
      this.objects = Object.keys(data);
      for (let i = 0; i <= this.objects.length - 1; i++) {
        const val = this.objects[i];
        this.firebaseDatabase.object('withdraw-request/' + this.objects[i]).valueChanges().subscribe((data: any) => {
          if (data) {
            const val = this.objects[i];
            const element = this.allData[val]
            element.uid = this.objects[i];
            const newData = { element, data };
            if (!this.new.some(item => item.element.uid === newData.element.uid && item.data === newData.data)) {
              this.new.push(newData);
            }
          }
        });
      }
    }) 
  }

  approve(uid: string, balance: number, amount: number, email: string, upi_id: string, account: string, mobile: string, ifsc: string) {

   if(!email){
    email = "";
   }
   if(!upi_id){
    upi_id="";
   }
   if(!uid){
    uid="";
   }
   if(!mobile){
    mobile="";
   }
   if(!ifsc){
    ifsc="";
   }
   if(!account){
    account="";
   }
   
    this.firebaseDatabase.object('withdraw-request/' + uid).remove().then(() => {
      const widrowId = this.firebaseDatabase.createPushId();
      const today = new Date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const day = ("0" + today.getDate()).slice(-2);
      const currentDate = `${year}-${month}-${day}`;
      this.firebaseDatabase.object('withdrawals/' + uid + '/' + widrowId).set({
        amount: amount,
        date: currentDate,
        id: widrowId,
        status: 'success',
        email: email,
        upi_id: upi_id,
        account: account,
        uid: uid,
        mobile: mobile,
        ifsc: ifsc
      }).then(() => {
          alert("success");
          this.loadData();
        
      })
    })
  }
  reject() {

  }



}
interface S {
  amount?: string;
  status?: string;
}