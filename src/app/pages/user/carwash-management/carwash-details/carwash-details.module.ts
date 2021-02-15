import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarwashDetailsPageRoutingModule } from './carwash-details-routing.module';

import { CarwashDetailsPage } from './carwash-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarwashDetailsPageRoutingModule
  ],
  declarations: [CarwashDetailsPage]
})
export class CarwashDetailsPageModule {}
