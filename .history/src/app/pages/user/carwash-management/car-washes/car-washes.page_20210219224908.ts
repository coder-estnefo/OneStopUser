import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-car-washes',
  templateUrl: './car-washes.page.html',
  styleUrls: ['./car-washes.page.scss'],
})
export class CarWashesPage implements OnInit {

  car_washes: ICarWash[] = [];

  constructor(
    private _carWashService: CarwashService
  ) { }

  ngOnInit() {
  }

  getCarWashes(){
    let id, carwash;
    this._carWashService.getCarwashes().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          carwash = response.payload.doc.data();
          this.car_washes.push({
            id: id,
            name: carwash.name,
            favorite: carwash.favorite,
            coordinates: carwash.coordinates,
            image: carwash.image
          });
        });
      }
    )
  }

}
