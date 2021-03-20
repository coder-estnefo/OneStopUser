import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestServicePageRoutingModule } from './request-service-routing.module';

import { RequestServicePage } from './request-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RequestServicePageRoutingModule
  ],
  declarations: [RequestServicePage]
})
export class RequestServicePageModule {}
