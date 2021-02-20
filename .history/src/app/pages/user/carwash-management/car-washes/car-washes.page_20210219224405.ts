import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';

@Component({
  selector: 'app-car-washes',
  templateUrl: './car-washes.page.html',
  styleUrls: ['./car-washes.page.scss'],
})
export class CarWashesPage implements OnInit {

  car_washes  = [1,2];

  constructor(
    private _carWashService: CarwashService
  ) { }

  ngOnInit() {
  }

  getCarWashes(){
    this._carWashService
    .get
  }

}
