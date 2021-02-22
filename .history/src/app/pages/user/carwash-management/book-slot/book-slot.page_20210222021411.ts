import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.page.html',
  styleUrls: ['./book-slot.page.scss'],
})
export class BookSlotPage implements OnInit {

  spinner: boolean = false;
  slot_form: FormGroup;
  
  constructor(
		private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastController
	) { }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _carwashService: CarwashService
  ) { }

  ngOnInit() {
    const carwash_id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCarwashPrices(carwash_id);
  }


  ngOnInit() {
		this.createForm();
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

}
