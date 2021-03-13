import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchedPropertyPage } from './searched-property.page';

const routes: Routes = [
  {
    path: '',
    component: SearchedPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchedPropertyPageRoutingModule {}
