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
    private userservice:UserService) { }

  ngOnInit() {
    this.getCarWashes();
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

  gotoMap(){
     this.router.navigate(['property-map'])

    let arry1 = [28.218370, 28.232370, 28.225370];
    let arry2 = [-25.731340, -25.735340, -25.737340];
    let arry3 = ["Kazi car Wash", "Couner we wash", "we clean car"];
    let mode="car-wash"
    
    

    this.userservice.setMapDetails(arry1,arry2,arry3,mode);

    // console.log(coodinate.arry1[1])
  }

}
