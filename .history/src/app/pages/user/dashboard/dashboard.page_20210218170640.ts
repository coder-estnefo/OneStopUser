import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user;

  constructor(
    private router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
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
        this.user = {
          id: response.payload.id,
          name: response.payload.data().name,
          email: response.payload.data().email,
        }
      }
    )
  }
}
