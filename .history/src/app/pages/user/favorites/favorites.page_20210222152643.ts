import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { IProperty } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: IProperty[] =[];

  constructor(
    private _propertyService: PropertiesService
  ) { }

  ngOnInit() {
    this.getFavoriteProperties();
  }

  // Check property duplicates
  checkPropertyDuplicate(property_id: string){
    return this.favorites.find(property => {
      return property.id == property_id;
    })
  }

  getFavoriteProperties(){
    let uid, property;
    this._propertyService.getFavoriteProperties().subscribe(
      responses => {
        responses.forEach(response => {
          uid = response.payload.doc.id;
          property = response.payload.doc.data();
          if(this.checkPropertyDuplicate(uid) == null){
            this.favorites.push({
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
