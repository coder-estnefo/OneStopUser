import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

export interface IUser{
  id: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  spinner;

  user: IUser;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private _authService: AuthService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.fireAuth.onAuthStateChanged(user => {
      this.getUser(user.uid);
    });
  }

  // Get user
  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user = response.payload.data() as IUser;
      }
    )
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
