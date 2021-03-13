import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { IServiceType } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.page.html',
  styleUrls: ['./service-type.page.scss'],
})
export class ServiceTypePage implements OnInit {

  id: string;
  services: IServiceType[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private _cleaningService: CleaningService
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((param) => {
      this.id = param.id;

    });

    this.getServiceTypes(this.id);
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
}
