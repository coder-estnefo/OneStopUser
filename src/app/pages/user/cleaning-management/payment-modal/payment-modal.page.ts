import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
