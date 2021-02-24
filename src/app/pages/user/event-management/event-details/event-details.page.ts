// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-event-details',
//   templateUrl: './event-details.page.html',
//   styleUrls: ['./event-details.page.scss'],
// })
// export class EventDetailsPage implements OnInit {

//   options = {
//     centeredSlides: true,
//     slidesPerView: 1,
//     spaceBetween: 10,
//   };

//   category = {
//     slidesPerView: 2.5,
//   };

//   constructor(
//     private router: Router,
//     private activatedRoute: ActivatedRoute
//   ) { }

//   ngOnInit() {
//   }


//
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { ICleaning } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: ICleaning;

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 10,
  };

  category = {
    slidesPerView: 2.5,
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _cleaningService: CleaningService,
  ) { }


  ngOnInit() {
    // const event_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    // this.getEventById(event_id);
  }

  gotoBookSlot(){
    this.router.navigateByUrl('book-slot');
  }

  gotoPrices(){
    this.router.navigate(['prices'])
  }

  // getEventById(event_id: string){
  //   let id, temp_event;
  //   this._cleaningService.getEventById(event_id).subscribe(
  //     response => {
  //       id = response.payload.id;
  //       temp_event = response.payload.data();
  //       this.event = {
  //         id: id,
  //         name: temp_event.name,
  //         image: temp_event.image,
  //         favorite: temp_event.favorite,
  //         coordinates: temp_event.coordinates
  //       }
  //     }
  //   )
  // }

}


