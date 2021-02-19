import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { IProperty } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit {

  property: IProperty;

  options = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _propertyService: PropertiesService
  ) { }

  ngOnInit() {
    let property_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPropertyById(property_id);
  }

  gotoSetAppointment(){
    this.router.navigateByUrl('appointment');
  }

  getPropertyById(property_id: string){
    let id, property, temp_property;
    this.property = null;
    this._propertyService.getPropertyById(property_id).subscribe(
      response => {
        id = response.payload.id;
        property = response.payload.data();
        temp_property = {
          id: id,
          name: property.name,
          location: property.location,
          image: property.image,
          price: property.price,
          garages: property.garages,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          description: property.description,
          availability_status: property.availability,
          features: property.featues
              // console.log(response.payload.data());
        }
        // this.property = temp_property;
      }
    )
  }

}
