import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarwashMapPageRoutingModule } from './carwash-map-routing.module';

import { CarwashMapPage } from './carwash-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarwashMapPageRoutingModule
  ],
  declarations: [CarwashMapPage]
})
export class CarwashMapPageModule {}
