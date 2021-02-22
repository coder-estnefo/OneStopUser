import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { ICarWash } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.page.html',
  styleUrls: ['./book-slot.page.scss'],
})
export class BookSlotPage implements OnInit {

  spinner: boolean = false;
  slot_form: FormGroup;
  carwash: ICarWash;
  
  constructor(
		private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController,
    private _carwashService: CarwashService,
	) { }

  ngOnInit() {
    const carwash_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.createForm();
    this.getCarwashById(carwash_id);
  }

	createForm() {
		this.slot_form = this.formBuilder.group({
			registration: new FormControl(null, [Validators.required,Validators.maxLength(8), Validators.minLength(8)]),
      model: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      make: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      color: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      time: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      date: new FormControl(null, [Validators.required, Validators.minLength(3)]),
		});
	}

  setAppointment(){
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      this.slot_form.reset();
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

  getCarwashById(carwash_id: string){
    let id, temp_carwash;
    this._carwashService.getCarwashById(carwash_id).subscribe(
      response => {
        id = response.payload.id;
        temp_carwash = response.payload.data();
        this.carwash = {
          id: id,
          name: temp_carwash.name,
          image: temp_carwash.image,
          favorite: temp_carwash.favorite,
          coordinates: temp_carwash.coordinates
        }
      }
    )
  }

  getWashType(carwash_id: string){
    this._carwashService.getCarwashPrices(carwash_id).subscribe(
      responses => {
        
      }
    )
  }

}
