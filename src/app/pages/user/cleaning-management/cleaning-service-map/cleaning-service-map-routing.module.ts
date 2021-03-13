import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningServiceMapPage } from './cleaning-service-map.page';

const routes: Routes = [
  {
    path: '',
    component: CleaningServiceMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningServiceMapPageRoutingModule {}
