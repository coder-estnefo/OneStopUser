import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  spinner: boolean = false;
	forgot_password_form: FormGroup;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private _authService: AuthService,
		private _userService: UserService
	) { }

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.forgot_password_form = this.formBuilder.group({
			email: new FormControl(null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])),
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

	sendPasswordResetLink(){
		this.validateAllFormFields(this.forgot_password_form);
		this.spinner = true;
		this._authService.resetPassword(this.forgot_password_form.value.email).then(
			response => {
				console.log(response);
			}
		)
	}
}
