import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarWashPage } from './car-wash.page';

const routes: Routes = [
  {
    path: '',
    component: CarWashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarWashPageRoutingModule {}
