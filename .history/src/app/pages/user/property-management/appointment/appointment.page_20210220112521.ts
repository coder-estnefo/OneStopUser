import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {


  spinner: boolean = false;
  appointment_form: FormGroup;
  
  constructor(
		private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private _propertyServices: Prop
	) { }


  ngOnInit() {
		this.createForm();
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

  setAppointment(){
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.appointment_form.reset();
			this.presentToast('You applied for an appointment')
		}, 5000);
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
          features: property.featues,
          favorite: property.favorite
        }
        this.property = temp_property;
      }
    )
  }
=======
}
>>>>>>> 091f797bf1c7cd301df46ea5787bfcc643ba74ca
}
