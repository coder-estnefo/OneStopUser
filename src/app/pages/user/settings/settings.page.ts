import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';

import firebase from 'firebase/app';
import { IUser } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  spinner;

  user: IUser;

  userID = firebase.auth().currentUser.uid;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private _authService: AuthService,
    private _userService: UserService,
    private profileService: ProfileService,
    private oneSignal: OneSignal
  ) { }

  ngOnInit() {
    // this.user = this.profileService;
    this.getUser(this.userID);
  }

  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user = response.payload.data() as IUser;
        console.log(this.user)
      }
    )
  }

  // Logout
  logOut(){
    this.spinner = true;
    this._authService.signOut().then(
      response => {
        this.spinner = false;

        this.oneSignal.removeExternalUserId();

        this.router.navigateByUrl('login');
      }
    );
  }

}
