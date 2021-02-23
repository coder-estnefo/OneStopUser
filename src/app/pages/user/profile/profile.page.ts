import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;

  constructor(private profileService: ProfileService, public route: Router) { }

goConfirm(){

  this.route.navigateByUrl('confirm')
}

  ngOnInit() {
    this.user = this.profileService;
  }
}
