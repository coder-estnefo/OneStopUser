import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyMapPage } from './property-map.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyMapPageRoutingModule {}
