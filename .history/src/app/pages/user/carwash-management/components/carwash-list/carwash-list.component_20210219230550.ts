import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-carwash-list',
  templateUrl: './carwash-list.component.html',
  styleUrls: ['./carwash-list.component.scss'],
})
export class CarwashListComponent implements OnInit {

  favourite: boolean = false;

  @Input() car_washes: ICarWash[];
  
  constructor(
    private router: Router,
    private _carWashService: CarwashService
  ) { }

  ngOnInit() {
  }

  gotoCarwashDetails(){
    this.router.navigateByUrl('carwash-details');
  }

  setFavorite(carwash_id: string, favorite: boolean){
    this._carWashService.setFavorite(carwash_id. favorite).then(
      response => {

      }
    )
  }

}
