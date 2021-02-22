import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  user: any;

  constructor(private route: Router, private  profileService: ProfileService) { }

  goDashboard(){
    this.route.navigateByUrl('/tabs-pages/tabs/dashboard')
  }
  goProfile() {
    this.route.navigateByUrl('/tabs-pages/tabs/profile');
  }
  ngOnInit() {
    this.user = this.profileService;
  }
}
