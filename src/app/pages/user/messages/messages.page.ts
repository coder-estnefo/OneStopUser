import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import firebase from 'firebase/app';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  /********************* */
  userId = firebase.auth().currentUser.uid;
  app_id = "7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3";
  messageId = ""
  user_id;
  property_Owner_id: string = this.route.snapshot.paramMap.get('id');
  /******************* */

  userID;
  propID;
  sendTo;
  chats = [];

  text;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService,
    private oneSignal: OneSignal,
    private _userService: UserService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      this.userID = param.userID;
      this.propID = param.propertyID;
      this.sendTo = param.sendTo;
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
          (
            chat.from === this.userID &&
            chat.to === this.sendTo &&
            chat.id === this.propID
          ) ||
          (
            chat.from === this.sendTo &&
            chat.to === this.userID &&
            chat.id === this.propID
          )
        )
      });

      const temp_chats = this.chats.sort((a, b) => a.date - b.date);
      this.chats = temp_chats;
    });
  }

  sendMessage() {
    if (this.text) {
      const date = new Date();
      const time = date.getHours() + ':' + date.getMinutes();
      const chat = {
        id: this.propID,
        from: this.userID,
        to: this.sendTo,
        message: this.text,
        time: time,
        date: date,
      };

      console.log(chat.id)

      // this._userService.getOwner()


      this.propertiesService.startChat(chat).then(() => {
        this.text = '';

       this.sendNotification();

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





  sendNotification() {

    let id
    let userData
    let temp = []

    this._userService.getOwner(this.property_Owner_id).subscribe(user => {
      
      id = user.payload.id;
      userData = user.payload.data();
      temp.push(userData)

      temp.forEach(a => {
         console.log(a)
        
        this.messageId = a.playerID

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
              //  alert("message from "+this.userId+" to " + this.user_id)
              // alert(JSON.stringify(success));
              alert("message send");

              
            }).catch((error) => {
      
              alert(JSON.stringify(error));
            })
      
    })

  }





}
