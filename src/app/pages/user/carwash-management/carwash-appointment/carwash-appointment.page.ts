import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app'
import { CarwashService } from 'src/app/services/carwash/carwash.service';

@Component({
  selector: 'app-carwash-appointment',
  templateUrl: './carwash-appointment.page.html',
  styleUrls: ['./carwash-appointment.page.scss'],
})
export class CarwashAppointmentPage implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  carwash_id = this.activatedRoute.snapshot.paramMap.get('id');
  userID = firebase.auth().currentUser.uid;
  carwash = []

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _carwashService: CarwashService,) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  sendRequest() {

    let id, temp_carwash;
    this._carwashService.getCarwashById(this.carwash_id).subscribe(
      response => {
        id = response.payload.id;
        temp_carwash = response.payload.data();
        this.carwash.push(temp_carwash)

        this.carwash.forEach(data => {
          console.log(data)
          this.startChat(id,data.ownerID, data.name)
        })
      }

    )
  }

  //  this.router.navigate(['tabs-pages/tabs/dashboard'])

  startChat(id, ownerID, carWashName) {

    const from = this.userID;
    const to = ownerID;
    const message = 'I am interested in this property: ' + carWashName;
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    // const senderName = this.userDetails.name;
    const chat = { id, message, from, to, time, date };

    this.router.navigate(['/messages/' + ownerID], {
      queryParams: { propertyID: id, userID: from, sendTo: to, propertyName: carWashName },
    });

  }
   
}
