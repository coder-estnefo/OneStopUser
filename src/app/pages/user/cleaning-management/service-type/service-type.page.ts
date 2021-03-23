import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { UserService } from 'src/app/services/user/user.service';
import { IServiceType } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.page.html',
  styleUrls: ['./service-type.page.scss'],
})
export class ServiceTypePage implements OnInit {

  requestList = [];
  totalPrice = 0.00;
  address;
  addressOk = false;

  userDetails;
  requestTo;
  cleaningName;

  id: string;
  services: IServiceType[] = [];

   sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: false
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private _cleaningService: CleaningService,
    private router: Router,
    private userService: UserService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe((param) => {
      this.id = param.id;
      this.cleaningName = param.name;
    });

    this.getServiceTypes(this.id);

    this.requestList = this._cleaningService.getUserServices();

    this.auth.authState.subscribe((user) => {
      this.getUserDetails(user.uid);
    })
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
    this.totalPrice = this._cleaningService.getUserServicesTotal();
    this.requestTo = service.ownerID;
  }

  requestService() {
    this.router.navigate(['request-service'], {queryParams: {
      id: this.id,
      to: this.requestTo,
      name: this.cleaningName,
    }})
  }

  getUserDetails(userID){
    this.userService.getUser(userID).subscribe((response) => {
      this.userDetails = response.payload.data();
    })
  }

  setAddress(address) {
    if(address === 'new'){
      // this._cleaningService.addUserServiceAddress(this.address);
      // this.addressOk = true;
    } else {
      let newAddress = "";
      address.map((line) => {
        newAddress += line + " ";
      })
      this._cleaningService.addUserServiceAddress(newAddress);
      this.addressOk = true;
    }
  }

  updateAddress($event) {
    if(this.address.length > 0){
      this._cleaningService.addUserServiceAddress(this.address);
      this.addressOk = true;
    } else {
      this.addressOk = false;
    }
  }
}
