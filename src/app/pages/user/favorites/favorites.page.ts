import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { ICarWash, ICleaning, IProperty } from 'src/app/structures/interfaces';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  spinner;
  user_id = firebase.auth().currentUser.uid;

  favoriteCarwashes: ICarWash[] = [];
  favoritesProperties: IProperty[] = [];
  favoriteCleaningService: ICleaning[] = [];

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  constructor(
    private router: Router,
    private _favoriteService: FavoritesService
  ) { }

  ngOnInit() {
    this.getfavoriteCarwashes();
    this.getfavoriteProperties();
    this.getfavoriteCleaningServices();
  }

  gotoAddFavorites() {
    this.router.navigateByUrl('add-favorites');
  }

  deleteFavoriteCarwash(carwash_id: string) {
    this._favoriteService.deleteFavoriteCarwash(this.user_id, carwash_id).then(
      response => {

      }
    )
  }


  deletefavoriteProperty(property_id) {
    this._favoriteService.deleteFavoriteProperty(this.user_id, property_id).then(
      response => {

      }
    )
  }

  deletefavoriteCleaningService(service_id: string) {
    this._favoriteService.deleteFavoriteCleaning(this.user_id, service_id).then(
      response => {

      }
    )
  }

  getfavoriteCarwashes() {
    this._favoriteService.getFavoriteCarwashes(this.user_id).subscribe(
      response => {
        this.favoriteCarwashes = response.map((carWash) => {
          return ({
            id: carWash.payload.doc.id,
            ...carWash.payload.doc.data() as ICarWash
          })
        });
      }
    )
  }

  getfavoriteProperties() {
    this._favoriteService.getFavoriteProperties(this.user_id).subscribe(
      response => {
        this.favoritesProperties = response.map((property) => {
          return ({
            id: property.payload.doc.id,
            ...property.payload.doc.data() as IProperty
          })
        });
      }
    );
  }

  getfavoriteCleaningServices() {
    this._favoriteService.getFavoriteCleaningServices(this.user_id).subscribe(
      response => {
        this.favoriteCleaningService = response.map((service) => {
          return ({
            id: service.payload.doc.id,
            ...service.payload.doc.data() as ICleaning
          })
        });
      }
    )
  }

}
