import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash, Ifavorite, IUser } from 'src/app/structures/interfaces';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

@Component({
  selector: 'app-car-washes',
  templateUrl: './car-washes.page.html',
  styleUrls: ['./car-washes.page.scss'],
})
export class CarWashesPage implements OnInit {

  user = firebase.auth().currentUser.uid;

  //user: IUser;
  favorite_carwash: Ifavorite;
  //car_washes: ICarWash[] = [];
  car_washes;

  constructor(
    private router: Router,
    private _userService: UserService,
    private fireAuth: AngularFireAuth,
    private _carWashService: CarwashService,
    private _favoritesService: FavoritesService
  ) { }

  ngOnInit() {

    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.carWashes();
      }
    });
  }

  gotoMap() {
    this.router.navigate(['carwash-map'])
  }

  carWashes() {
    this._carWashService.getCarwashes().subscribe((response) => {
      this.car_washes = response.map((carWash) => {
        return ({
          id: carWash.payload.doc.id,
          ...carWash.payload.doc.data() as ICarWash
        })
      });
    })
  }

}
