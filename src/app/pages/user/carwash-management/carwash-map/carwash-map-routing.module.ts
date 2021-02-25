import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarwashMapPage } from './carwash-map.page';

const routes: Routes = [
  {
    path: '',
    component: CarwashMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarwashMapPageRoutingModule {}
