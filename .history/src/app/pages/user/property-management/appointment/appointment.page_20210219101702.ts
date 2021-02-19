import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PropertiesService } from 'src/app/services/properties/properties.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  property;
  spinner: boolean = false;
  appointment_form: FormGroup;
  
  constructor(
		private router: Router,
    private toast: ToastController,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _propertyService: PropertiesService
	) { }


  ngOnInit() {
    this.createForm();
    const property_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPropertyById(property_id);
  }

	createForm() {
		this.appointment_form = this.formBuilder.group({
			name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required,]),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])),
		});
	}

  setAppointment(property_id: string){
    // this.spinner = true;
    console.log(property_id);
    // this._propertyService.setAppointment(property_id, this.appointment_form.value);
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 5000,
      color: 'secondary'
    });
    toast.present();
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
        }
        this.property = temp_property;
        console.log(this.property);
      }
    )
  }
}
