import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import firebase from 'firebase/app';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	spinner: boolean = false;
	login_form: FormGroup;
	userInfor=[]
	 
	app_id = "7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3";

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private _authService: AuthService,
		private _userService: UserService,
		private oneSignal: OneSignal,
		private firestore: AngularFirestore
	) { }

	ngOnInit() {
		this.createForm();
	
    //    
	}

	createForm() {
		this.login_form = this.formBuilder.group({
			email: new FormControl(null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
		});
	}

	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	// Login with email and password
	loginWithEmailAndPassword(){
		this.validateAllFormFields(this.login_form);
		this.spinner = true;
		this._authService.signInEmail(this.login_form.value).then(
			response => {

				let userID = firebase.auth().currentUser.uid;



				this.firestore.collection("Users").get().subscribe(response => {

					response.forEach(fireData => {
						let id = fireData.id;
						console.log(id)
						this.userInfor.push(id)

					})



					var existItem = this.userInfor.find(x => x == userID);

					console.log(userID + "  " + existItem)

					if (existItem) {

						this.spinner = false;
						this.router.navigate(['tabs-pages/tabs/dashboard']);
					} else {
						alert("user does not exist");
						this.spinner = false;
						this._authService.signOut()
					}
				})



				this.initApp(userID)

				/*this.oneSignal.getIds().then(user=>{
					this.firestore.collection("Users").doc(this.userID).update({
						playerID: user.userId
					})
					.then(()=>{
						this.spinner = false;
						this.router.navigate(['tabs-pages/tabs/dashboard']);
						}
					)
				})*/

			},
			error => {
				alert(error);
				this.spinner = false;
			}
		);
	}

	initApp(userID) {

		this.oneSignal.startInit(this.app_id, '482944391704');
		//send player id to firebase
		this.oneSignal.setExternalUserId(userID);

		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

		this.oneSignal.handleNotificationReceived().subscribe(() => {
		alert('notification received')
		});

		this.oneSignal.handleNotificationOpened().subscribe(() => {
		alert('notification opened')
		});

		this.oneSignal.endInit();
	}
}
