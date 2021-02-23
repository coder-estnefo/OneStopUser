import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { ICarWash, ICleaning } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.html',
  styleUrls: ['./service-lists.css'],
})
export class ServiceListPage implements OnInit {

  favourite: boolean = false;

  @Input() cleaning_services: ICleaning[];
  getTempCleaning: any;
  
  constructor(
    private router: Router,
    private _cleaningService: CleaningService
  ) { }

  ngOnInit() {
  }

  gotoServiceDetails(){
    this.router.navigateByUrl('service-details');
  }

  setFavorite(cleaning_id: string, favorite: boolean){
    let temp_cleaning: ICarWash;
    this._cleaningService.setFavorite(cleaning_id, !favorite).then(
      () => {
        temp_cleaning = this.getTempCleaning(cleaning_id);
        temp_cleaning.favorite = !favorite;
      }
    );
  }

  getTempCarWash(cleaning_id: string){
    return this.cleaning_services.find(cleaning => {
      return cleaning.id == cleaning_id;
    });
  }

}
