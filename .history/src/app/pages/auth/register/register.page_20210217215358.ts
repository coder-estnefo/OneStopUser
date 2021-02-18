import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  spinner: boolean = false;
	register_form: FormGroup;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
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
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])),

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

	SingUpWithEmailAndPassword(){
		this.validateAllFormFields(this.register_form);
		this.spinner = true;
	}
}
