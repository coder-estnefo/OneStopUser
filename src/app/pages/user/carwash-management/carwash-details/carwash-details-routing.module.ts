import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarwashDetailsPage } from './carwash-details.page';

const routes: Routes = [
  {
    path: '',
    component: CarwashDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarwashDetailsPageRoutingModule {}
