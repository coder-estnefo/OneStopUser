import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { ICleaning } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  [x: string]: any;

  cleaning: ICleaning;

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
    const cleaning_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCleaningById(cleaning_id);
  }

  gotoBookSlot(){
    this.router.navigateByUrl('book-slot');
  }

  gotoPrices(){
    this.router.navigate(['prices'])
  }

  getCleaningById(cleaning_id: string){
    let id, temp_cleaning;
    this._cleaningService.getCleaningById(cleaning_id).subscribe(
      response => {
        id = response.payload.id;
        temp_cleaning = response.payload.data();
        this.cleaning = {
          id: id,
          name: temp_cleaning.name,
          image: temp_cleaning.image,
          favorite: temp_cleaning.favorite,
          coordinates: temp_cleaning.coordinates
        }
      }
    )
  }

}
