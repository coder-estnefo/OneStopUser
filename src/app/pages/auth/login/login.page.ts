import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
		this.router.navigate(['tabs-pages/tabs/dashboard'])
	}
}
