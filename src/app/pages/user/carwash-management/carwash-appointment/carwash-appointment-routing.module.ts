import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarwashAppointmentPage } from './carwash-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: CarwashAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarwashAppointmentPageRoutingModule {}
