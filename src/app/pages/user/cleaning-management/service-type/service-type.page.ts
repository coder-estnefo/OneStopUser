import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { Feature, MapboxService } from 'src/app/services/mapbox/mapbox.service';
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
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: false
  };

  checkAddress ="";

  delivery = false;
  collect = true;
  coordinates : any;
  list : any;
  selectedAddress : string= "";
  lat;
  lng;


  addresses = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private _cleaningService: CleaningService,
    private router: Router,
    private userService: UserService,
    private auth: AngularFireAuth,
    private mapbox: MapboxService
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

   search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapbox.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }


  addressCheck(event){
    this.checkAddress = event.target.value;
    console.log("info",this.checkAddress);
  }


  onSelect(address, i) {
    this.selectedAddress = address;
    //  selectedcoodinates=

    console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
    console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
    this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
    this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
    // this.user.coords = [this.lng,this.lat];
    console.log("index =" + i)
    console.log(this.selectedAddress)
    // this.user.address = this.selectedAddress;
    this.addresses = [];
    
    let newAddress = this.checkAddress + " , " + address; 
    this._cleaningService.addUserServiceAddress(newAddress);
    this.addressOk = true;
  }
}
