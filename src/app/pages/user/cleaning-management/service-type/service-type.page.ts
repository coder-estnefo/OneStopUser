import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { IServiceType } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.page.html',
  styleUrls: ['./service-type.page.scss'],
})
export class ServiceTypePage implements OnInit {

  requestList = [];

  id: string;
  services: IServiceType[] = [];

   sliderConfig = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private _cleaningService: CleaningService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((param) => {
      this.id = param.id;

    });

    this.getServiceTypes(this.id);

    this.requestList = this._cleaningService.getUserServices();
  }


  getServiceTypes(service_id: string) {
    this._cleaningService.getServiceTypes(service_id).subscribe(response => {
      this.services = response.map(service => {
        return ({
          id: service.payload.doc.id,
          ...service.payload.doc.data() as IServiceType
        });
      });
    });
  }

  addService(service) {
    this._cleaningService.addUserService(service);
  }

  requestService() {
    this.router.navigate(['request-service'], {queryParams: {
      id: this.id
    }})
  }
}
