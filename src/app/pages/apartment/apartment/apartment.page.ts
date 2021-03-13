import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModelPage } from '../../Model/model/model.page';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.page.html',
  styleUrls: ['./apartment.page.scss'],
})
export class ApartmentPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
     
    });
    return await modal.present();
  }

}
