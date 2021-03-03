import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash } from 'src/app/structures/interfaces';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-car-washes',
  templateUrl: './car-washes.page.html',
  styleUrls: ['./car-washes.page.scss'],
})
export class CarWashesPage implements OnInit {

  car_washes: ICarWash[] = [];

  constructor(
    private router:Router,
    private userservice:UserService,
    private _carWashService: CarwashService
    ) { }

  ngOnInit() {
    this.getCarWashes();
  }

  checkDuplicate(carwash_id: string){
    return this.car_washes.find(carwash => {
      return carwash.id == carwash_id;
    })
  }

  getCarWashes(){
    let id, carwash;
    this._carWashService.getCarwashes().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          carwash = response.payload.doc.data();
          if(this.checkDuplicate(id) == null){
            this.car_washes.push({
              id: id,
              name: carwash.name,
              // favorite: carwash.favorite,
              coordinates: carwash.coordinates,
              images: carwash.images
            });
          }
        });
      }
    )
  }

  gotoMap(){
     this.router.navigate(['carwash-map'])
  }

}
