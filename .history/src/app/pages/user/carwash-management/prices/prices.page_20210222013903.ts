import { Component, OnInit } from '@angular/core';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { IWashType } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

  wash_types: IWashType[] = []; 

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
          id = response.payload.doc.id;
          temp_carwash = response.payload.doc.data();
          this.wash_types.push({
            id: id,
            name: temp_carwash.name,
            image
          })

        })
      }
    )
  }

}
