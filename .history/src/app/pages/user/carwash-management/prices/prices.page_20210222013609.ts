import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

  constructor(
    private _carwashService: CarwashService
  ) { }

  ngOnInit() {
  }

  getCarwashPrices(carwash_id: string){
    let id, temp_carwash;
    this._carwashService.getCarwashPrices(carwash_id).subscribe(
      responses => {
        responses.forEach(response => {

        })
      }
    )
  }

}
