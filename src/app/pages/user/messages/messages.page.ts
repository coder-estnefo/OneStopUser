import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
userID;
  propID;
  sendTo;
  chats = [];

  text;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService
  ) {}

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
          (chat.from === this.userID && chat.to === this.sendTo) ||
          (chat.from === this.sendTo && chat.to === this.userID)
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
      this.propertiesService.startChat(chat).then(() => {
        this.text = '';
      });
    }
  }

}
