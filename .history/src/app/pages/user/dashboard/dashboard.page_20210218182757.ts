import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

export interface IUser{
  id: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.fireAuth.onAuthStateChanged(user => {
      if(user){
        this.getUser(user.uid);
      }
    });
  }

  gotoEvents(){
    this.router.navigateByUrl('events');
  }

  gotoProperties(){
    this.router.navigateByUrl('properties');
  }

  gotoCarwash(){
    this.router.navigateByUrl('car-washes');
  }

  // Get user
  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user = response.payload.data() as IUser;
      }
    )
  }
}
