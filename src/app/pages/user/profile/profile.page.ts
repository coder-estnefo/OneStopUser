import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from '../dashboard/dashboard.page';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  user_details: IUser;
  frm_profile: FormGroup;
  spinner: boolean = false;

  constructor(
    public route: Router,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private fireAuth: AngularFireAuth,
    private profileService: ProfileService,
    ) { }

  goConfirm(){
    this.route.navigateByUrl('confirm')
  }

  ngOnInit() {
    // this.user = this.profileService;

    this.fireAuth.onAuthStateChanged(user => {
      if(user){
        this.getUser(user.uid);
      }
    });
    this.createForm();
  }

  createForm() {
		this.frm_profile = this.formBuilder.group({
			name: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])),
		});
	}

  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user_details = response.payload.data() as IUser;
      }
    )
  }

  updateProfile(){
    this.spinner = true;

    console.log(this.frm_profile.value);
  }
}
