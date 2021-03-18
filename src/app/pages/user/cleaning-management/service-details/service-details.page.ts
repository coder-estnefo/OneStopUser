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

  cleaningService: ICleaning;

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
    this.getCleaningServiceById(cleaning_id);
  }

  gotoBookSlot() {
    this.router.navigateByUrl('book-slot');
  }

  gotoPrices() {
    this.router.navigate(['prices'])
  }

  goToServiceTypes(id: string) {
    this.router.navigate(['/service-type/'], {
      queryParams: { id: id },
    });
  }

  getCleaningServiceById(cleaning_id: string) {
    let id, temp_cleaning;
    this._cleaningService.getCleaningServiceById(cleaning_id).subscribe(
      response => {
        id = response.payload.id;
        temp_cleaning = response.payload.data();
        this.cleaningService = {
          id: response.payload.id,
          ...response.payload.data() as ICleaning
        }
      }
    )
  }



}
