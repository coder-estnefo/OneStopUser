import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  spinner;

  user: any;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private _authService: AuthService,
    private _userService: UserService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.user = this.profileService;
    console.log(this.user);
  }

  // Logout
  logOut(){
    this.spinner = true;
    this._authService.signOut().then(
      response => {
        this.spinner = false;
        this.router.navigateByUrl('login');
      }
    );
  }

}
