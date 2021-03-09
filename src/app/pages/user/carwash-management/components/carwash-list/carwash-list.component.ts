import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash, Ifavorite } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-carwash-list',
  templateUrl: './carwash-list.component.html',
  styleUrls: ['./carwash-list.component.scss'],
})
export class CarwashListComponent implements OnInit {

  favourite: boolean = false;

  @Input() user;
  @Input() likes: Ifavorite[];
  @Input() car_washes: ICarWash[];
  @Output() favoriteCarwashEvent = new EventEmitter<ICarWash>();

  constructor(
    private router: Router,
    private _carWashService: CarwashService
  ) { }

  ngOnInit() {
    // console.log(this.likes)
  }

  gotoCarwashDetails() {
    this.router.navigateByUrl('carwash-details');
  }

  setFavoriteCarwash(carwash: ICarWash) {
    this.favoriteCarwashEvent.emit(carwash);
  }

  removefavoriteCarwash(carwash: ICarWash) {
    this.favoriteCarwashEvent.emit(carwash);
  }

  getTempCarWash(carwash_id: string) {
    return this.car_washes.find(carwash => {
      return carwash.id == carwash_id;
    });
  }

}
