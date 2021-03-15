import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceTypePageRoutingModule } from './service-type-routing.module';

import { ServiceTypePage } from './service-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceTypePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiceTypePage]
})
export class ServiceTypePageModule { }
