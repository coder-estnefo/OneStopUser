import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningServicesPage } from './cleaning-services.page';

const routes: Routes = [
  {
    path: '',
    component: CleaningServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningServicesPageRoutingModule {}
