import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ModalController } from '@ionic/angular';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { UserService } from 'src/app/services/user/user.service';
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

  chats = [];
  text;

  userDetails;
  noPic;
  picUrl;

  ownerDetails;
  ownerNoPic;
  ownerPicUrl;

  constructor(
    private cleaningService: CleaningService,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private userService: UserService,
    private calendar: Calendar,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.sendTo = param.to;
      this.cleaningBusinesID = param.id;
      this.cleaningName = param.name;
      this.getDays(this.sendTo);
    });

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

      this.getUserDetails(this.userID);
      this.getOwnerDetails(this.sendTo);
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

  getUserDetails(userID) {
    this.userService.getUser(this.userID).subscribe((response) => {
      this.userDetails = response.payload.data();
      if (this.userDetails.profilePic != undefined || this.userDetails.profilePic != null) {
        this.picUrl = this.userDetails.profilePic;
      } else {
        this.noPic = true;
      }
    })
  }

  getOwnerDetails(ownerID) {
    this.userService.getOwner(ownerID).subscribe((response) => {
      this.ownerDetails = response.payload.data();
      if (this.ownerDetails.profilePic != undefined || this.ownerDetails.profilePic != null) {
        this.ownerPicUrl = this.ownerDetails.profilePic;
      } else {
        this.ownerNoPic = true;
      }
    })
  }

  newAppointment() {
    this.chats = [];
  }

  addEvent(chat) {
    console.log(chat);
    let dt = chat.requestDate;
    let dd = dt.slice(0,2);
    let mm = dt.slice(3,5);
    let yyyy = dt.slice(6,10);
    let time = dt.slice(11);
    let newDate = yyyy + "/" + mm + "/" + dd +" " + time;
    let startdate = new Date(newDate);
    let newDateEnd = new Date(newDate);
    let enddate = new Date(newDateEnd.setMinutes(newDateEnd.getMinutes() + 30));

    let options = { 
      calendername: "Cleaning Request" + chat.serviceRequest.address, 
      url: '', 
      firstReminderMinute: 30 
    };

    this.calendar
      .createEventInteractivelyWithOptions('Cleaning Request', chat.serviceRequest.address, '',startdate, enddate, options)
      .then(()=>{
        alert("Event Saved");
      })
  }

}
