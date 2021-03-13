import { Component, OnInit } from '@angular/core';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { ICleaning } from 'src/app/structures/interfaces';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cleaning-services',
  templateUrl: './cleaning-services.page.html',
  styleUrls: ['./cleaning-services.page.scss'],
})
export class CleaningServicesPage implements OnInit {

  //cleaning_services: ICleaning[] = [];
  cleaning_services;

  constructor(
    private router: Router,
    private userservice: UserService,
    private _cleaningService: CleaningService
  ) { }

  ngOnInit() {
    this.getCleaningServices();
  }

  getTempService(service_id: string) {
    return this.cleaning_services.find(service => {
      return service.id == service_id;
    })
  }

  getCleaningServices() {
    this._cleaningService.getCleaningServices().subscribe((response) => {
      this.cleaning_services = response.map((service) => {
        return ({
          ...service.payload.doc.data() as ICleaning
        })
      })
    })
  }

  gotoMap() {
    this.router.navigate(['cleaning-service-map'])
  }

}
