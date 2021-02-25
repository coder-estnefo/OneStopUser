import { Component, OnInit } from '@angular/core';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { ICleaning } from 'src/app/structures/interfaces';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  event: ICleaning[] = [];

  constructor(
    private router:Router,
    private userservice:UserService,
    private _cleaningService: CleaningService
  ) { }

  ngOnInit() {
    // this.getEvent();
  }

  getEvent(){
    // let id, cleaning;
    // this._cleaningService.getCleaning().subscribe(
    //   responses => {
    //     responses.forEach(response => {
    //       id = response.payload.doc.id;
    //       cleaning = response.payload.doc.data();
    //       this.event.push({
    //         id: id,
    //         name: cleaning.name,
    //         favorite: cleaning.favorite,
    //         address: cleaning.address,
    //         image: cleaning.image
    //       });
    //     });
    //   }
    // )
  }

  gotoMap(){
     this.router.navigate(['property-map'])

    let arry1 = [28.218370, 28.232370, 28.225370];
    let arry2 = [-25.731340, -25.735340, -25.737340];
    let arry3 = ["ALdophus cleaning services", "Expert cleaning services", "Megical Hands cleaning"];
    let mode="cleaning-services"



    this.userservice.setMapDetails(arry1,arry2,arry3,mode);

    // console.log(coodinate.arry1[1])
  }

}
