import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarWashesPage } from './car-washes.page';

const routes: Routes = [
  {
    path: '',
    component: CarWashesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarWashesPageRoutingModule {}
