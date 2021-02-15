import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookSlotPageRoutingModule } from './book-slot-routing.module';

import { BookSlotPage } from './book-slot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookSlotPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BookSlotPage]
})
export class BookSlotPageModule {}
