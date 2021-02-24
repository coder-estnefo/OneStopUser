import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleaningServicesPageRoutingModule } from './cleaning-services-routing.module';

import { CleaningServicesPage } from './cleaning-services.page';
import { ServiceListPage } from '../components/service-list/service-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleaningServicesPageRoutingModule
  ],
  declarations: [CleaningServicesPage, ServiceListPage]
})
export class CleaningServicesPageModule {}
