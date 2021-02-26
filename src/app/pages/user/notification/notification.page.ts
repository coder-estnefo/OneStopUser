import { Component, OnInit } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import firebase from 'firebase/app';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  userId = firebase.auth().currentUser.uid;
  app_id = "7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3";

  user_id;

  constructor(
    private oneSignal: OneSignal
    ) { }

  ngOnInit() {
    this.initApp()
  }


  initApp() {

    alert("working");

    // initiate player Id
    this.oneSignal.setExternalUserId(this.userId);

    this.oneSignal.startInit(this.app_id, '482944391704');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe(data => {

      let msg = data.payload.body;
      let title = data.payload.title;

      // alert(msg + title);

      alert("received");
    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let msg = data.notification.payload.body
      // alert(msg)
      alert("opened");
    });

    this.oneSignal.endInit();

  }


  sendNotification(){


    //gets the current player ID    (id.userId)
    this.oneSignal.getIds().then(id=>{

      /*
      please add id.userId to firebase. it is the player_Id
       
      */

      let notificationObj = {
        contents: {
          en: "message body",
        },
        app_id: this.app_id,
        external_user_id: this.userId,
        //sets the target user
        include_player_ids: [this.user_id],
        
      };

      //sends the notification

      this.oneSignal.postNotification(notificationObj).then((success) => {
        // handle received here how you wish.
         alert("message from "+this.userId+" to " + this.user_id)
        // alert(JSON.stringify(success));
      }).catch((error) => {

        alert(JSON.stringify(error));
      })
    })

  }


}
