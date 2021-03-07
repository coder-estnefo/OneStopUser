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
    private router:Router,
    private userservice:UserService,
    private _cleaningService: CleaningService
  ) { }

  ngOnInit() {
    this.getCleaningServices();
  }

  getTempService(service_id: string){
    return this.cleaning_services.find(service => {
      return service.id == service_id;
    })
  }

  getCleaningServices(){
    let id, cleaning;
    // this._cleaningService.getCleaningServices().subscribe(
    //   responses => {
    //     responses.forEach(response => {
    //       id = response.payload.doc.id;
    //       cleaning = response.payload.doc.data();
    //       if(this.getTempService(id) == null){
    //         this.cleaning_services.push({
    //           id: id,
    //           name: cleaning.name,
    //           favorite: cleaning.favorite,
    //           address: cleaning.address,
    //           images: cleaning.images
    //         });
    //       }
    //     });
    //   }
    // )
    this._cleaningService.getCleaningServices().subscribe((response)=>{
      this.cleaning_services = response.map((service)=> {
        return ({
          ...service.payload.doc.data() as ICleaning
        })
      })
    })
  }

  gotoMap(){
     this.router.navigate(['cleaning-service-map'])
  }

}
