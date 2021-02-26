import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carwash-appointment',
  templateUrl: './carwash-appointment.page.html',
  styleUrls: ['./carwash-appointment.page.scss'],
})
export class CarwashAppointmentPage implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,private router:Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  sendRequest(){

     this.router.navigate(['tabs-pages/tabs/dashboard'])
  }

}
