import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	spinner: boolean = false;
	register_form: FormGroup;
	app_id = "7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3";
	player_id = ''

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private _authService: AuthService,
		private _userservice: UserService,
		private oneSignal: OneSignal
	) { }

	ngOnInit() {
		this.initApp();
		this.createForm();
	}

	createForm() {
		this.register_form = this.formBuilder.group({
			name: new FormControl(null,
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(30),
					Validators.pattern('[A-Za-z]+')])),

			email: new FormControl(null,
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')
				])),

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

	SingUpWithEmailAndPassword() {
		this.spinner = true;
		
		let chatId
		this.oneSignal.getIds().then(id => {
			chatId = id.userId
		});

		this.validateAllFormFields(this.register_form);
		this._authService.signUpEmail(this.register_form.value.email, this.register_form.value.password)
			.then(
				response => {
					this._userservice.addUser(response.user.uid, this.register_form.value, chatId);
					this.spinner = false;
					this.router.navigateByUrl('login');
				}
			);

	}


	initApp() {

		this.oneSignal.startInit(this.app_id, '482944391704');
		//send player id to firebase
		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

		this.oneSignal.handleNotificationReceived().subscribe(data => {

			let msg = data.payload.body;
			let title = data.payload.title;

			//alert("received");
		});

		this.oneSignal.handleNotificationOpened().subscribe(data => {
			let msg = data.notification.payload.body
			// alert(msg)
			//alert("opened");
		});

		this.oneSignal.endInit();
	}

}
