import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchedPropertyPageRoutingModule } from './searched-property-routing.module';

import { SearchedPropertyPage } from './searched-property.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchedPropertyPageRoutingModule
  ],
  declarations: [SearchedPropertyPage]
})
export class SearchedPropertyPageModule {}
