import { IProperty } from 'src/app/structures/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.page.html',
  styleUrls: ['./property-list.page.scss'],
})
export class PropertyListPage implements OnInit {

  @Input() properties: IProperty[];
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  gotoPropertyDetails(){
    this.router.navigateByUrl('property-details');
  }

  getTempProperty(property_id: string){
    return this.properties.find(property => {
      return property.id == property_id;
    });
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
}
