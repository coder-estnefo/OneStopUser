import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { ICarWash, IProperty } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  carwashes: ICarWash[] = [];
  properties: IProperty[] = [];
  favoriteCarwashes: ICarWash[] = [];
  favoritesProperties: IProperty[] =[];

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  constructor(
    private _carwashService: CarwashService,
    private _propertyService: PropertiesService
  ) { }

  ngOnInit() {
    this.getFavoriteCarwashes();
    this.getFavoriteProperties();
  }

  // Check Carwash duplicates
  checkCarwashDuplicate(carwash_id: string){
    return this.favoriteCarwashes.find(carwash => {
      return carwash.id == carwash_id;
    })
  }

  // Check property duplicates
  checkPropertyDuplicate(property_id: string){
    return this.favoritesProperties.find(property => {
      return property.id == property_id;
    })
  }

  // Find carwash from carwash array
  getTempCarWash(carwash_id: string){
    return this.carwashes.find(carwash => {
      return carwash.id == carwash_id;
    });
  }

  // Find property from properties array
  getTempProperty(property_id: string){
    return this.properties.find(property => {
      return property.id == property_id;
    });
  }

  // Set favorite carwash
  setFavoriteCarwash(carwash_id: string, favorite: boolean){
    let temp_carwash: ICarWash;
    this._carwashService.setFavorite(carwash_id, !favorite).then(
      () => {
        temp_carwash = this.getTempCarWash(carwash_id);
        temp_carwash.favorite = !favorite;
      }
    );
  }

  // Set favorite property
  setFavoriteProperty(property_id: string, favorite: boolean){
    let temp_property: IProperty;
    this._propertyService.setFavoriteProperty(property_id, !favorite).then(
      () => {
        temp_property = this.getTempProperty(property_id);
        temp_property.favorite = !favorite;
        this.getFavoriteProperties();
      }
    )
  }

  // Get favorite car wash
  getFavoriteCarwashes(){
    let id, carwash;
    this._carwashService.getFavoriteCarWash().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          carwash = response.payload.doc.data();
          if(this.checkCarwashDuplicate(id) == null){
            this.favoriteCarwashes.push({
              id: id,
              name: carwash.name,
              favorite: carwash.favorite,
              coordinates: carwash.coordinates,
              image: carwash.image
            });
          }
        });
      }
    )
  }

  // Get favorite properties
  getFavoriteProperties(){
    let uid, property;
    this._propertyService.getFavoriteProperties().subscribe(
      responses => {
        responses.forEach(response => {
          uid = response.payload.doc.id;
          property = response.payload.doc.data();
          if(this.checkPropertyDuplicate(uid) == null){
            this.favoritesProperties.push({
              id: uid,
              name: property.name,
              address: property.location,
              images: property.images,
              price: property.price,
              garages: property.garages,
              bedrooms: property.bedrooms,
              bathrooms: property.bathrooms,
              description: property.description,
              availability_status: property.availability,
              features: property.features,
              favorite: property.favorite
            });
          }
        });
      }
    )
  }
}
