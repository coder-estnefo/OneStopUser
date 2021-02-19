import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { IProperty } from 'src/app/structures/interfaces';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  // properties = [{ img: "../../../../../assets/icon/apartment1/outside/out.jfif" },
  // { img: "../../../../../assets/icon/apartment1/outside/2.jfif" },
  // { img: "../../../../../assets/icon/apartment1/outside/3.jpg" },
  // { img: "../../../../../assets/icon/apartment1/outside/4.jfif" },
  // { img: "../../../../../assets/icon/apartment1/outside/5.jfif" }];

  properties: IProperty[] = [];

  constructor(
    private router:Router,
    private _propertyService: PropertiesService
    ) { }

  ngOnInit() {
    this.getProperties();
  }

  gotoMap(){
    this.router.navigate(['property-map'])
  }

  getProperties(){
    let uid, property;
    this._propertyService.getProperties().subscribe(
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
            features: property.featues
          });
        });
      }
    )
  }

}
