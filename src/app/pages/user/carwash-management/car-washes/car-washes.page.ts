import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-washes',
  templateUrl: './car-washes.page.html',
  styleUrls: ['./car-washes.page.scss'],
})
export class CarWashesPage implements OnInit {

  car_washes  = [1,2];

  constructor() { }

  ngOnInit() {
  }

}
