import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Choice {
  id: number;
  name: string;
  price: number;
  amount: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

  data: Choice[] = [
    {id:1, name:'Exquisite', price: 250, image: "../../assets/images/exquisite.jpg", amount: 0, description:"Wash, tyres, dash & trim"},
    {id:2, name:'Beast',price: 200, image: "../../assets/images/beast.jpg", amount: 0, description:"Wash & Dry"},
    {id:3, name:'Glam', price:230, image: "../../assets/images/glam.jpg", amount: 0, description:"Full wash, tyres, dash & trim"},
    {id:4, name:'Wanted', price:350, image: "../../assets/images/wanted.jpg", amount: 0, description:"Full wash, tyres, dash & trim, including hand polish"},
    {id:5, name:'Popular', price:150, image: "../../assets/images/popular.jpg", amount: 0, description:"Wash & Go"}
​
  ];
 
  private package = [];
  private packageItemCount = new BehaviorSubject(0);
 
  constructor() {}
 
  getChoice() {
    return this.data;
  }
 
  getPackage() {
    return this.package;
  }
 
  getPackageItemCount() {
    return this.packageItemCount;
  }
  
 
  addChoice(choice) {
    let added = false;
    for (let c of this.package) {
      if (c.id === choice.id) {
        c.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      choice.amount = 1;
      this.package.push(choice);
    }
    this.packageItemCount.next(this.packageItemCount.value + 1);
  }
 
 
  removeChoice(choice) {
    for (let [index, c] of this.package.entries()) {
      if (c.id === choice.id) {
        this.packageItemCount.next(this.packageItemCount.value - c.amount);
        this.package.splice(index, 1);
      }
    }
  }

}
