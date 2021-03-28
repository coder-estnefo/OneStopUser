import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import firebase from 'firebase/app';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  /********************* */
  userId = firebase.auth().currentUser.uid;
  app_id = '7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3';
  messageId = '';
  user_id;
  property_Owner_id: string = this.route.snapshot.paramMap.get('id');
  /******************* */

  userID;
  propID;
  sendTo;
  propertyName;
  chats = [];

  text;
  viewingDates;

  userDetails;
  noPic;
  picUrl;

  ownerDetails;
  ownerNoPic;
  ownerPicUrl;

  date;
  time;
  minTime;
  maxTime;
  dateSelected;
  
  isDateSelected = false;
  isTimeSelected = false;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    private oneSignal: OneSignal,
    private _userService: UserService,
    private firestore: AngularFirestore,
    private calendar: Calendar
  ) {}

  ngOnInit() {
    this.calendar.createCalendar('MyCalendar').then();
    this.route.queryParams.subscribe((param) => {
      this.userID = param.userID;
      this.propID = param.propertyID;
      this.sendTo = param.sendTo;
      this.propertyName = param.propertyName;
    });

    this.propertiesService.getChats(this.userID).subscribe((response) => {
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
            chat.id === this.propID) ||
          (chat.from === this.sendTo &&
            chat.to === this.userID &&
            chat.id === this.propID)
        );
      }).sort((a, b) => a.date - b.date);

      // const temp_chats = this.chats.sort((a, b) => a.date - b.date);
      // this.chats = temp_chats;

      this.propertiesService
        .getViewingDates(this.sendTo)
        .subscribe((response) => {
          this.viewingDates = response.payload.data();
          console.log(this.viewingDates)
        });
    });

    this.getUserDetails(this.userID);
    this.getOwnerDetails(this.sendTo);
  }

  sendMessage() {
    if (this.text) {
      const date = new Date();
      const time = this.formatTime(date);
      const appointment = this.dateSelected + ' ' + this.time;
      const chat = {
        id: this.propID,
        from: this.userID,
        to: this.sendTo,
        message: this.text,
        time: time,
        date: date,
        propertyName: this.propertyName,
        appointmentDate: appointment,
        requestType: "property",
      };

      console.log(chat.id);

      // this._userService.getOwner()

      this.propertiesService.startChat(chat).then(() => {
        this.sendNotification();
        //this.text = '';

        let ownerData;
        let playerID;

        /*this.firestore
          .collection('Owner')
          .doc(chat.to)
          .snapshotChanges()
          .subscribe((owner) => {
            ownerData = { ...owner.payload.data() as Object };

            playerID = ownerData.playerID;
            alert('playerID' + playerID);

            let notificationObj = {
              headings: {
                en: 'New Message'
              },
              contents: {
                en: chat.message,
              },
              app_id: this.app_id,
              external_user_id: chat.to,
              include_player_ids: [playerID],
            };

            this.oneSignal.postNotification(notificationObj).then((success) => {
              // handle received here how you wish.
              alert("message from " + chat.from + " to " + chat.to)
              // alert(JSON.stringify(success));
            }).catch((error) => {
              alert(JSON.stringify(error));
            })

          })*/
      });
    }
  }

  pickDay() {
    this.isDateSelected = true;
  }

  pickTime() {
    this.isTimeSelected = true;
  }

  requestAppointment() {

    // let dt = new Date(this.date);
    // let t = new Date(this.time);

    // let date = this.formatDate(dt);
    // let time = this.formatTime(t);

    this.text = 'Appointment request, Date: ' + this.dateSelected + ' ' + this.time;
    this.sendMessage();
    //this.addToCalender(dt);
  }

  cancelAppointment(){
    this.isDateSelected = false;
    this.isTimeSelected = false;
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

  selectDay(day) {
    let today = new Date();
    let newDate = new Date(today);
    newDate.setDate(today.getDate() + (day.day - today.getDay() + 7) % 7 + 1);
    this.dateSelected = this.formatDate(newDate);
    this.minTime = day.from;
    this.maxTime = day.to;
    this.pickDay();
  }

  setTime() {
    let newTime = this.formatTime(this.time);
    this.time = newTime;
    this.pickTime();
  }

  addToCalender(chat) {
    console.log(chat);
    let dt = chat.appointmentDate;
    let dd = dt.slice(0,2);
    let mm = dt.slice(3,5);
    let yyyy = dt.slice(6,10);
    let time = dt.slice(11);
    let newDate = yyyy + "/" + mm + "/" + dd +" " + time;
    let startdate = new Date(newDate);
    let newDateEnd = new Date(newDate);
    let enddate = new Date(newDateEnd.setMinutes(newDateEnd.getMinutes() + 30));

    let options = { 
      calendername: "Viewing Appointment", 
      url: '', 
      firstReminderMinute: 15 
    };

    this.calendar
      .createEventInteractivelyWithOptions('Viewing appointment', chat.propertyName, '',startdate, enddate, options)
      .then(()=>{
        alert("Event is set");
      })
  }

  sendNotification() {
    let id;
    let userData;
    let temp = [];
    console.log(this.property_Owner_id);
    this._userService.getOwner(this.property_Owner_id).subscribe((user) => {
      id = user.payload.id;
      userData = user.payload.data();
      temp.push(userData);

      temp.forEach((a) => {
        console.log(a);
        this.messageId = a.playerID;
      });

      console.log(this.messageId);

      let notificationObj = {
        contents: {
          en: this.text,
        },
        app_id: this.app_id,
        external_user_id: this.userId,
        include_player_ids: [this.messageId],
        data: {
          userID: this.userID,
          propertyID: this.propID,
          sendTo: this.sendTo,
          propertyName: this.propertyName,
          type: 'propertyChat'
        }
      };

      this.oneSignal
        .postNotification(notificationObj)
        .then((success) => {
          // handle received here how you wish.
          //alert('message from ' + this.userId + ' to ' + this.user_id);
          // alert(JSON.stringify(success));
          //alert('message send');
          this.text = "";
        })
        .catch((error) => {
          //alert(error.message);
          //alert(JSON.stringify(error));
        });
    });
  }

  getUserDetails(userID) {
    this._userService.getUser(this.userID).subscribe((response) => {
      this.userDetails = response.payload.data();
      if (this.userDetails.profilePic != undefined || this.userDetails.profilePic != null) {
        this.picUrl = this.userDetails.profilePic;
      } else {
        this.noPic = true;
      }
    })
  }

  getOwnerDetails(ownerID) {
    this._userService.getOwner(ownerID).subscribe((response) => {
      this.ownerDetails = response.payload.data();
      if (this.ownerDetails.profilePic != undefined || this.ownerDetails.profilePic != null) {
        this.ownerPicUrl = this.ownerDetails.profilePic;
      } else {
        this.ownerNoPic = true;
      }
      console.log(this.ownerDetails)
    })
  }

  newAppointment() {
    this.chats = [];
  }
}
