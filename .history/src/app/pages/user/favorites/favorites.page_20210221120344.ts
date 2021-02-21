import { Component, OnInit } from '@angular/core';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(
    private _propertyService: PropertiesService
  ) { }

  ngOnInit() {
  }

  getFavoriteProperties(){
    this._propertyService.getFavoriteProperties().subscribe(
      responses => {
        
      }
    )
  }
}
