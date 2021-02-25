import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { IProperty } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit {

  userID;
  property: IProperty;

  options = {
    slidesPerView: 1,
    spaceBetween: 5,
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _propertyService: PropertiesService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
     this.auth.authState.subscribe((user) => {
      this.userID = user.uid;
    });

    const property_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPropertyById(property_id);
  }

  gotoSetAppointment(){
    // this.router.navigateByUrl('appointment');
    this.router.navigateByUrl('notification');
  }

  getPropertyById(property_id: string){
    let id, property, temp_property;
    this.property = null;
    this._propertyService.getPropertyById(property_id).subscribe(
      response => {
        id = response.payload.id;
        property = response.payload.data();
        console.log(property)
        temp_property = {
            id: id,
            name: property.name,
            address: property.location,
            images: property.images,
            price: property.price,
            garages: property.garages,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            description: property.description,
            availability_status: property.availability,
            features: property.features,
            favorite: property.favorite,
            ownerID: property.ownerID
        }
        this.property = temp_property;
        console.log(this.property);
      }
    )
  }

  startChat(id, ownerID) {
    const from = this.userID;
    const to = ownerID;
    const message = 'I am interested in this property: ';
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const chat = { id, message, from, to, time, date };

    this._propertyService.startChat(chat).then(()=>{
      this.router.navigate(['/tabs-pages/tabs/chats']);
    })
  }

}
