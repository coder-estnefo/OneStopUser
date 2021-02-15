import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarWashesPageRoutingModule } from './car-washes-routing.module';

import { CarWashesPage } from './car-washes.page';
import { CarwashListComponent } from '../components/carwash-list/carwash-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarWashesPageRoutingModule,
  ],
  declarations: [CarWashesPage, CarwashListComponent]
})
export class CarWashesPageModule {}
