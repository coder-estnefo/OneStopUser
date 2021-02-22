import { PropertiesPage } from './../../../../../.history/src/app/pages/user/property-management/properties/properties.page_20210220114955';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { UserService } from 'src/app/services/user/user.service';
import { ICarWash, IProperty } from 'src/app/structures/interfaces';

export interface IUser{
  id: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user;
  
  carwashes: ICarWash[] = [];
  properties: IProperty[] = [];

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private _userService: UserService,
    private _carwashService: CarwashService,
    private _propertyService: PropertiesService
  ) { }

  ngOnInit() {
    this.fireAuth.onAuthStateChanged(user => {
      if(user){
        this.getUser(user.uid);
      }
    });

    this.getCarWashes();
    this.getProperties();
  }

  gotoEvents(){
    this.router.navigateByUrl('events');
  }

  gotoProperties(){
    this.router.navigateByUrl('properties');
  }

  gotoCarwash(){
    this.router.navigateByUrl('car-washes');
  }

   getTempCarWash(carwash_id: string){
    return this.carwashes.find(carwash => {
      return carwash.id == carwash_id;
    });
  }

  getTempProperty(property_id: string){
    return this.properties.find(property => {
      return property.id == property_id;
    });
  } 

  // Check property duplicates
  checkPropertyDuplicate(property_id: string){
    return this.properties.find(property => {
      return property.id == property_id;
    })
  }

  // Check car wash duplicate
  checkCarwashDuplicate(carwash_id: string){
    return this.carwashes.find(carwash => {
      return carwash.id == carwash_id;
    })
  }

  // Get user
  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user = response.payload.data() as IUser;
      }
    )
  }

  // Set favorite property
  setFavoriteProperty(property_id: string, favorite: boolean){
    let temp_property: IProperty;
    this._propertyService.setFavoriteProperty(property_id, !favorite).then(
      () => {
        temp_property = this.getTempProperty(property_id);
        temp_property.favorite = !favorite;
      }
    )
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

  // Get car washes
  getCarWashes(){
    let id, temp_carwash;
    this._carwashService.getCarwashes().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          temp_carwash = response.payload.doc.data();
          if(this.checkCarwashDuplicate(id))
        });
      }
    )
  }

  // Get properties
  getProperties(){
    let uid, property;
    this._propertyService.getProperties().subscribe(
      responses => {
        responses.forEach(response => {
          uid = response.payload.doc.id;
          property = response.payload.doc.data();

          if(this.checkPropertyDuplicate(uid) == null){
            this.properties.push({
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
