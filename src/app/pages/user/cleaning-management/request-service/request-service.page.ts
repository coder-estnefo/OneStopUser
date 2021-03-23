import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { PaymentModalPage } from '../payment-modal/payment-modal.page'

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.page.html',
  styleUrls: ['./request-service.page.scss'],
})
export class RequestServicePage implements OnInit {

  userID;

  requestedServices;
  address;
  totalPrice;

  selectedDate;
  selectedTime;

  dateOk = undefined;
  timeOk = undefined;
  
  minTime;
  maxTime;

  cleaningDays;
  sendTo;
  cleaningBusinesID;
  cleaningName;

  chats;
  text;

  constructor(
    private cleaningService: CleaningService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.auth.authState.subscribe((user) => {
      this.userID = user.uid;

      this.cleaningService.getChats(this.userID).subscribe((response) => {
        this.chats = response.map((chats) => {
          return {
            id: chats.payload.doc.id,
            ...(chats.payload.doc.data() as Object),
          };
        });
        this.chats = this.chats.filter((chat) => {
          return (
            (chat.from === this.userID &&
              chat.to === this.sendTo &&
              chat.id === this.cleaningBusinesID) ||
            (chat.from === this.sendTo &&
              chat.to === this.userID &&
              chat.id === this.cleaningBusinesID)
          );
        });

        const temp_chats = this.chats.sort((a, b) => a.date - b.date);
        this.chats = temp_chats;
        console.log(this.chats)
      });
    });

    this.route.queryParams.subscribe((param) => {
      this.sendTo = param.to;
      this.cleaningBusinesID = param.id;
      this.cleaningName = param.name;
      this.getDays(this.sendTo);
    });

    

    this.requestedServices = this.cleaningService.getUserServices();
    // console.log(this.requestedServices);
    this.address = this.cleaningService.getUserServiceAddress();
    this.totalPrice = this.cleaningService.getUserServicesTotal();
  }

  sendMessage() {
    let address = this.cleaningService.getUserServiceAddress();
    const serviceRequest = {
      services: this.requestedServices,
      price: this.totalPrice,
      address: address,
    }
    this.text = `Cleaning Request:\nDate:${this.selectedDate} ${this.selectedTime}\nLocation:\n${address}`;
    if (this.text) {
      const date = new Date();
      const time = this.formatTime(date);
      const appointment = this.selectedDate + ' ' + this.selectedTime;
      const chat = {
        id: this.cleaningBusinesID,
        from: this.userID,
        to: this.sendTo,
        message: this.text,
        time: time,
        date: date,
        cleaningName: this.cleaningName,
        requestDate: appointment,
        requestType: "cleaning",
        serviceRequest: serviceRequest
      };

      this.cleaningService.startChat(chat).then(() => {
        this.text = '';
        console.log('mesage sent');
      });
    }
  }

  getDays(ownerID) {
    this.cleaningService.getViewingDates(ownerID).subscribe((response) => {
      this.cleaningDays = response.payload.data();
      console.log(this.cleaningDays);
    })
  }

  selectDay(day){
    let today = new Date();
    let newDate = new Date(today);
    newDate.setDate(today.getDate() + (day.day - today.getDay() + 7) % 7 + 1);
    this.selectedDate = this.formatDate(newDate);
    this.minTime = day.from;
    this.maxTime = day.to;
    this.dateOk = true;
  }

  setTime() {
    let newTime = this.formatTime(this.selectedTime);
    this.selectedTime = newTime;
    this.timeOk = true;
  }

  payNow() {
    this.sendMessage();
    //this.presentModal();
  }

  cancelPayment() {
    
  }

  cancelAppointment() {
    
    this.cancelPayment();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  formatDate(dt) {
    let day =
      dt.getDate() < 10
        ? '0' + dt.getDate().toString()
        : dt.getDate().toString();
    let month =
      dt.getMonth() < 10
        ? '0' + (dt.getMonth() + 1).toString()
        : dt.getMonth().toString();
    let year =
      dt.getFullYear() < 10
        ? '0' + dt.getFullYear().toString()
        : dt.getFullYear().toString();

    return day + '/' + month + '/' + year;
  }

  formatTime(d) {
    let dt = new Date(d);
    let day =
      dt.getDate() < 10
        ? '0' + dt.getDate().toString()
        : dt.getDate().toString();
    let hours =
      dt.getHours() < 10
        ? '0' + dt.getHours().toString()
        : dt.getHours().toString();
    let minutes =
      dt.getMinutes() < 10
        ? '0' + dt.getMinutes().toString()
        : dt.getMinutes().toString();

    return  hours + ':' + minutes;
  }

}
