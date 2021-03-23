import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { ICarWash, ICleaning, IProperty } from 'src/app/structures/interfaces';
import firebase from 'firebase/app';

@Component({
  selector: 'app-add-favorites',
  templateUrl: './add-favorites.page.html',
  styleUrls: ['./add-favorites.page.scss'],
})
export class AddFavoritesPage implements OnInit {

  user_id = firebase.auth().currentUser.uid;

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  carwashes: ICarWash[] = [];
  properties: IProperty[] = [];
  cleaningServices: ICleaning[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private _carWashService: CarwashService,
    private _propertyService: PropertiesService,
    private _cleaningService: CleaningService,
    private _favoriteService: FavoritesService
  ) { }

  ngOnInit() {

    this.carWashes();
    this.getProperties();
    this.getCleaningServices();

    // this.activeRoute.queryParams.subscribe(params => {
    //   if(params.type ===  "apartments"){
    //     this.getProperties();
    //   }
    //   else if(params.type ===  "carwashes"){
    //     this.carWashes();
    //   }
    //   else if(params.type ===  "cleaning-services"){
    //     this.getCleaningServices();
    //   }
    // })
  }


  addFavoriteProperty(property: IProperty) {
    this._favoriteService.AddFavoriteproperty(this.user_id, property).then(
      response => {
        console.log("Property added to favorites");
      }
    )
  }


  addFavoriteCarwash(carwash: ICarWash) {
    this._favoriteService.AddFavoriteCarwash(this.user_id, carwash).then(
      response => {
        console.log("Carwash added to favorites");
      }
    );
  }

  addFavoriteCleaningService(service: ICleaning) {
    this._favoriteService.AddFavoriteCleaningService(this.user_id, service).then(
      response => {
        console.log("Service added to favorites");
      }
    )
  }

  getProperties() {
    this._propertyService.getProperties().subscribe((response) => {
      this.properties = response.map((property) => {
        return ({
          id: property.payload.doc.id,
          ...property.payload.doc.data() as IProperty
        })
      })
    })
  }

  carWashes() {
    this._carWashService.getCarwashes().subscribe((response) => {
      this.carwashes = response.map((carWash) => {
        return ({
          id: carWash.payload.doc.id,
          ...carWash.payload.doc.data() as ICarWash
        })
      });
    })
  }

  getCleaningServices() {
    this._cleaningService.getCleaningServices().subscribe((response) => {
      this.cleaningServices = response.map((service) => {
        return ({
          id: service.payload.doc.id,
          ...service.payload.doc.data() as ICleaning
        })
      })
    })
  }

}
