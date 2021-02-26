import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleaningServiceMapPageRoutingModule } from './cleaning-service-map-routing.module';

import { CleaningServiceMapPage } from './cleaning-service-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleaningServiceMapPageRoutingModule
  ],
  declarations: [CleaningServiceMapPage]
})
export class CleaningServiceMapPageModule {}
