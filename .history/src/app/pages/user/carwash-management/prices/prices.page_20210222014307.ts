import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _carwashService: CarwashService
  ) { }

  ngOnInit() {
    const carwash_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCarwashPrices(carwash_id);
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
            image: temp_carwash.image,
            price: temp_carwash.price,
            description: temp_carwash.description
          });

        })
      }
    )
  }

}
