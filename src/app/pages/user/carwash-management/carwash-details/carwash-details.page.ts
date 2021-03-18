import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash } from 'src/app/structures/interfaces';
import firebase from 'firebase/app';

@Component({
  selector: 'app-carwash-details',
  templateUrl: './carwash-details.page.html',
  styleUrls: ['./carwash-details.page.scss'],
})
export class CarwashDetailsPage implements OnInit {

  carwash: ICarWash;

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
    private _carwashService: CarwashService,
  ) { }


  ngOnInit() {
    const carwash_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCarwashById(carwash_id);
  }

  gotoBookSlot() {
    this.router.navigateByUrl('book-slot');
  }

  gotoPrices() {
    this.router.navigate(['prices'])
  }

  getCarwashById(carwash_id: string) {
    let id, temp_carwash;
    this._carwashService.getCarwashById(carwash_id).subscribe(
      response => {
        this.carwash = {
          id: response.payload.id,
          ...response.payload.data() as ICarWash
        }
      }
    )
  }

  goToSetAppointment() {
    this.router.navigate(['carwash-appointment'])
  }



}
