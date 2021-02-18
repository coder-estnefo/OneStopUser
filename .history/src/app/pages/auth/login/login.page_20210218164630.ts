import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	spinner: boolean = false;
	login_form: FormGroup;

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

	loginWithEmailAndPassword(){
		this.validateAllFormFields(this.login_form);
		this.spinner = true;
		this._authService.signInEmail(this.login_form.value).then(
			response => {
				this.spinner = false;
				this.router.navigate(['tabs-pages/tabs/dashboard']);
			}
		);
	}
}
