import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { UserService } from 'src/app/services/user/user.service';
import { IProperty } from 'src/app/structures/interfaces';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  properties : IProperty[] = [];

 

  constructor(
    private router:Router, 
    private userservice:UserService,
    private _propertyService: PropertiesService
    ) { }

  ngOnInit() {
  }

  gotoMap(){
     this.router.navigate(['property-map'])

    let arry1 = [28.218370, 28.212370, 28.215370];
    let arry2 = [-25.731340, -25.735340, -25.737340];
    let arry3 = ["Librito flets availeble", "D_head flets availeble", "vivis flets availeble"];
    let mode="property"

    this.userservice.setMapDetails(arry1,arry2,arry3,mode);
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
            features: property.featues,
            favorite: property.favorite
          });
        });
      }
    );
  }

}
