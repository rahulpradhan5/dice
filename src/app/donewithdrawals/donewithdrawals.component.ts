import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donewithdrawals',
  templateUrl: './donewithdrawals.component.html',
  styleUrls: ['./donewithdrawals.component.css']
})
export class DonewithdrawalsComponent implements OnDestroy {
  wallet_arr: any;
  users_arr: any ;
  new: any[] = [];
  ll: any[] = [];
  transaction: any[] = [];
  subscription: any;

  constructor(public ActiveR: ActivatedRoute, public firebaseDatabase: AngularFireDatabase) {
    this.subscription = this.firebaseDatabase.list('withdrawals').snapshotChanges().subscribe((actions) => {
      this.wallet_arr = actions.map((action) => {
        const key = action.key;
        const value = action.payload.val();
        return { key, value };
      });
     
      for (var i = 0; i <= this.wallet_arr.length - 1; i++) {
        this.wallet_arr[i].value.key = this.wallet_arr[i].key;
        this.new.push(this.wallet_arr[i].value)
      }
 const flattenedArray = this.new.reduce((acc, subarray) => acc.concat(subarray), []);
      const valuesArray = flattenedArray.map((obj: any) => Object.values(obj));
      const flattenedValuesArray = [].concat(...valuesArray);
      const transformedArray = flattenedValuesArray.map((obj: any) => ({ id: obj.id, amount: obj.amount, date: obj.date, uid: obj.uid, upi_id: obj.upi_id, accout_no: obj.account, email: obj.email, status: obj.status,mobile:obj.mobile,ifsc:obj.ifsc }));
      const successData = transformedArray.filter(item => item.status === "success");

      this.transaction = successData;
      
    });
  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
