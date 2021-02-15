import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  spinner;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.spinner = true;
    setTimeout(() => {
    this.spinner = false;
    this.router.navigateByUrl('login');
    }, 2000);
  }

}
