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
        this.getLikes();
      }
    });
  }

  checkDuplicate(carwash_id: string) {
    return this.car_washes.find(carwash => {
      return carwash.id == carwash_id;
    })
  }

  setFavoriteCarwash(carwash: ICarWash) {
    // if(!carwash.favorite){
    this._favoritesService.setFavoriteCarwash(this.user, carwash.id).then(
      response => {
        // carwash.favorite.next(!carwash.favorite);
      }
    );
  }

  removefavoriteCarwash(carwash: ICarWash) {
    this._favoritesService.removeFavoriteCarwash(this.user, carwash.id).then(
      response => {
        // carwash.favorite.next(!carwash.favorite);
      }
    )
  }

  // getFavoriteCarwashById(carwash_id: string, data){
  //   let favorite_carwash: Ifavorite;
  //   this._favoritesService.getFavoriteCarwashById(this.user.id, carwash_id).subscribe((response) => {
  //     favorite_carwash = response.payload.data() as Ifavorite;
  //     if(favorite_carwash != undefined){
  //       if(this.checkDuplicate(favorite_carwash.carwash_id) == undefined){
  //         this.car_washes.push({
  //           id: carwash_id,
  //           name: data.name,
  //           images: data.images,
  //           favorite: true,
  //           coordinates: data.coordinates
  //         })
  //       }
  //     }
  //     else{
  //       if(this.checkDuplicate(carwash_id) == undefined){
  //         this.car_washes.push({
  //           id: carwash_id,
  //           name: data.name,
  //           images: data.images,
  //           favorite: false,
  //           coordinates: data.coordinates
  //         })
  //       }
  //     }
  //   });
  // }

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

      this.car_washes.forEach(element => {
        console.log(element);
      });
    })

  }

  likes: Ifavorite[] = [];

  getLikes() {
    this._favoritesService.getFavoriteCarwashByUserId(this.user).subscribe((response) => {
      this.likes = response.map((like) => {
        return ({
          id: like.payload.doc.id,
          ...like.payload.doc.data() as Ifavorite
        })
      })
    })
  }

}
