import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  spinner;

  user;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.fireAuth.onAuthStateChanged(user => {
      this.getUser(user.uid);
    })
  }

  // Get user
  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user = {
          id: response.payload.id,
          name: response.payload.data().name,
          email: response.payload.data().email,
        }
      }
    )
  }

  // Logout
  logOut(){
    this.spinner = true;
    setTimeout(() => {
    this.spinner = false;
    this.router.navigateByUrl('login');
    }, 2000);
  }

}
