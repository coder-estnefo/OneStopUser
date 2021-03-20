import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { PaymentModalPage } from '../payment-modal/payment-modal.page'

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.page.html',
  styleUrls: ['./request-service.page.scss'],
})
export class RequestServicePage implements OnInit {

  requestedServices;
  address;

  date;
  time;

  questionOne = undefined;
  questionTwo = undefined;
  questionThree = undefined;
  questionFour = undefined;
  dateSelected;

  constructor(
    private cleaningService: CleaningService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.requestedServices = this.cleaningService.getUserServices();
    console.log(this.requestedServices);
  }

  questionOneYes() {
    this.questionOne = true;
  }

  questionOneNo() {
    this.questionOne = false;
  }

  payNow() {
    this.questionTwo = true;
    this.presentModal();
  }

  cancelPayment() {
    this.questionTwo = false;
  }

  cancelAppointment() {
    this.questionThree = false;
    this.cancelPayment();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
