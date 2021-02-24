import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarwashAppointmentPageRoutingModule } from './carwash-appointment-routing.module';

import { CarwashAppointmentPage } from './carwash-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarwashAppointmentPageRoutingModule
  ],
  declarations: [CarwashAppointmentPage]
})
export class CarwashAppointmentPageModule {}
