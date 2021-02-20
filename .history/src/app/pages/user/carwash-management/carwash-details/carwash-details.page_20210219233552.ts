import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash } from 'src/app/structures/interfaces';

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
  }

  gotoBookSlot(){
    this.router.navigateByUrl('book-slot');
  }

  gotoPrices(){
    this.router.navigate(['prices'])
  }

  getCarwashById(carwash_id: string){
    let id, temp_carwash;
    this._carwashService.getCarwashById(carwash_id).subscribe(
      response => {
        id = response.payload.id;
        temp_carwash = response.payload.data();
        this.carwash = {
          id: id,
          name: temp_carwash.name,
          image: temp_carwash.image,
          favorite: temp_carwash.favorite,
          coordinates: temp_carwash.coordinates
        }
      }
    )
  }

}
