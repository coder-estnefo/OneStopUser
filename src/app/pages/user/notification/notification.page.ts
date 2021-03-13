import { Component, OnInit } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import firebase from 'firebase/app';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  userId = firebase.auth().currentUser.uid;
  app_id = "7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3";
   messageId=""
  user_id;

  constructor(
    private oneSignal: OneSignal,
    private _userService:UserService
  ) { }

  ngOnInit() {

    // this.initApp()

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
     let id 
     let userData 
     
     let temp=[] 
    this._userService.getUser(this.userId ).subscribe(user=>{

      id = user.payload.id;
      userData = user.payload.data();
       temp.push(userData)

       temp.forEach(a => {
        //  console.log(a)
         alert(a.chat_id)
         this.messageId=a.chat_id
         
      });

      console.log(this.messageId)


      let notificationObj = {
        contents: {
          en: "message body",
        },
        app_id: this.app_id,
        external_user_id: this.userId,
        include_player_ids: [this.messageId],
      };

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
