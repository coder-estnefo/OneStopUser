import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// Interfaces
import { ICarWash, ICleaning, IProperty, IUser } from 'src/app/structures/interfaces';

// Services
import { UserService } from 'src/app/services/user/user.service';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { PropertiesService } from 'src/app/services/properties/properties.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  user: IUser;
  carwashes: ICarWash[] = [];
  totalCarWashes: number = 0;
  totalProperties: number = 0;
  properties: IProperty[] = [];
  totalCleaningServices: number = 0;
  cleaning_services: ICleaning[] = [];

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
    private _cleaningService: CleaningService,
    private _propertyService: PropertiesService,
  ) { }

  ngOnInit() {
    this.getTotalCarwashes();
    this.getTotalProperties();
    this.getTotalCleaningServices();

    this.fireAuth.onAuthStateChanged(user => {
      if(user){
        this.getUser(user.uid);
      }
    });
  }

  gotoCleaningServices(){
    this.router.navigateByUrl('cleaning-services');
  }

  gotoProperties(){
    this.router.navigateByUrl('properties');
  }

  gotoCarwash(){
    this.router.navigateByUrl('car-washes');
  }

  // Check cleaning service duplicates
  checkCleaningServiceDuplicates(cleaning_id: string){
    return this.cleaning_services.find(cleaning => {
      return cleaning.id == cleaning_id;
    })
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

  // Get total properties
  getTotalProperties(){
    this._propertyService.getProperties().subscribe(
      responses => {
        this.totalProperties = responses.length;
      }
    );
  }

  // Get total Carwashes
  getTotalCarwashes(){
    this._carwashService.getCarwashes().subscribe(
      responses => {
        this.totalCarWashes = responses.length;
      }
    )
  }

  // Get total cleaning services
  getTotalCleaningServices(){
    this._cleaningService.getCleaningServices().subscribe(
      responses => {
        this.totalCleaningServices = responses.length;
      }
    )
  }

  // Set favorite property
  setFavoriteProperty(property_id: string, favorite: boolean){
    let temp_property: IProperty;
    this._propertyService.setFavoriteProperty(property_id, !favorite).then(
      () => {
        temp_property = this.checkPropertyDuplicate(property_id);
        temp_property.favorite = !favorite;
      }
    )
  }

  // Set favorite carwash
  setFavoriteCarwash(carwash_id: string, favorite: boolean){
    let temp_carwash: ICarWash;
    this._carwashService.setFavorite(carwash_id, !favorite).then(
      () => {
        temp_carwash = this.checkCarwashDuplicate(carwash_id);
        // temp_carwash.favorite = !favorite;
      }
    );
  }

  // Set favorite cleaning services
  setFavoriteCleaningService(cleaning_service_id: string, favorite: boolean){
    let temp_cleaning_service: ICleaning;
    this._cleaningService.setFavorite(cleaning_service_id, favorite).then(
      () => {
        temp_cleaning_service = this.checkCleaningServiceDuplicates(cleaning_service_id);
        temp_cleaning_service.favorite = !favorite;
      }
    );
  }

  // Get cleaning services
  getCleaningServices(){
    let id, cleaning;
    this._cleaningService.getCleaningServices().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          cleaning = response.payload.doc.data();
          if(this.checkCleaningServiceDuplicates(id) == null){
            this.cleaning_services.push({
              id: id,
              name: cleaning.name,
              favorite: cleaning.favorite,
              address: cleaning.address,
              images: cleaning.images
            });
          }
        });
      }
    )
  }

  // Get car washes
  getCarWashes(){
    let id, temp_carwash;
    this._carwashService.getCarwashes().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          temp_carwash = response.payload.doc.data();
          if(this.checkCarwashDuplicate(id) == null){
            this.carwashes.push({
              id: id,
              name: temp_carwash.name,
              // favorite: temp_carwash.favorite,
              coordinates: temp_carwash.coordinates,
              images: temp_carwash.images
            });
          }
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
