import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  userID;
  propertyChats=[]

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private propertiesService: PropertiesService,
    private auth: AngularFireAuth
  ) { 

  }

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
    })

    
  }


}
