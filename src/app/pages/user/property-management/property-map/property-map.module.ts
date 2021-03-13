import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyMapPageRoutingModule } from './property-map-routing.module';

import { PropertyMapPage } from './property-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyMapPageRoutingModule
  ],
  declarations: [PropertyMapPage]
})
export class PropertyMapPageModule {}
