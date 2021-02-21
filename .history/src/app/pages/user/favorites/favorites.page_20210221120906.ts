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

  getFavoriteProperties(){
    let uid, property;
    this._propertyService.getFavoriteProperties().subscribe(
      responses => {
        responses.forEach(response => {
          uid = response.payload.doc.id;
          property = response.payload.doc.data();
          this.properties.push({
            id: uid,
            name: property.name,
            location: property.location,
            image: property.image,
            price: property.price,
            garages: property.garages,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            description: property.description,
            availability_status: property.availability,
            features: property.featues,
            favorite: property.favorite
          });
        });

        console.log(this.properties);
      }
    )
  }
}
