import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarWashPageRoutingModule } from './car-wash-routing.module';

import { CarWashPage } from './car-wash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarWashPageRoutingModule
  ],
  declarations: [CarWashPage]
})
export class CarWashPageModule {}
