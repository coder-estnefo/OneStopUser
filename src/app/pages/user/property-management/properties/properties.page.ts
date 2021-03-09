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

  properties;
  

  constructor(
    private router:Router, 
    private userservice:UserService,
    private _propertyService: PropertiesService
    ) { }

    ngOnInit() {
      this.getProperties();
    }

  gotoMap(){
     this.router.navigate(['property-map'])
  }
  
  getProperties(){
    this._propertyService.getProperties().subscribe((response) => {
      this.properties = response.map((property) => {
        return ({
          id: property.payload.doc.id,
          ...property.payload.doc.data() as IProperty
        })
      })  
    })
  }




}
