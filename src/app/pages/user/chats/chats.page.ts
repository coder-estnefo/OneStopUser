import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  userID;
  propertyChats = [];
  property_Owner_id: string = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private propertiesService: PropertiesService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {

    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userID = user.uid;
        this.getPropertiesChats();
      }
    });
  }

  getPropertiesChats() {
    this.propertiesService.getChats(this.userID).subscribe((response) => {
      this.propertyChats = response.map((chats) => {
        return {
          id: chats.payload.doc.id,
          ...(chats.payload.doc.data() as Object),
        };
      });

      const temp_chats = this.propertyChats.sort((a, b) => b.date - a.date);
      this.propertyChats = temp_chats;
      console.log(this.propertyChats);

      const result = [];
      const map = new Map();
      for (const item of this.propertyChats) {
          if(!map.has(item.chatID)){
              map.set(item.chatID, true);    // set any value to Map
              result.push({
                ...item
              });
            }
        }
        this.propertyChats = result;
        console.log(result)
    });
  }

  toMessages(chat) {
    const { id, to, from } = chat;

    if (chat.requestType) {
      if (chat.requestType === "cleaning") {
        this.router.navigate(['request-service'], {queryParams: {
          id: id,
          to: to,
          name: chat.cleaningName,
        }})
      }

      if (chat.requestType === "carWash") {
        this.router.navigate(['carwash-messages'], {queryParams: {
          userID: from,
          sendTo: to,
          id: id,
          to: to,
          name: chat.carwashName,
        }})
      }

      if (chat.requestType === "property") {
        // this.router.navigate(['messages'], {queryParams: {
        //   id: id,
        //   to: to,
        //   name: chat.propertyName,
        // }})
        this.router.navigate(['messages/'+this.property_Owner_id], {
        queryParams: { propertyID: id, userID: from, sendTo: to , propertyName: chat.propertyName},
      });
      }

    }
     else {
      // this.router.navigate(['messages/'+this.property_Owner_id], {
      //   queryParams: { propertyID: id, userID: from, sendTo: to , propertyName},
      // });
    }
  
  }

  formatDate(dt) {
    dt = new Date(dt);
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

  go(dt) {
    let date = new Date(dt.seconds * 1000).toLocaleString('en-ZA');
    let newDate = this.formatDate(date);
    return newDate;
  }

}
