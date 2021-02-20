import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carwash-list',
  templateUrl: './carwash-list.component.html',
  styleUrls: ['./carwash-list.component.scss'],
})
export class CarwashListComponent implements OnInit {

  @Input() car_washes;
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  gotoCarwashDetails(){
    this.router.navigateByUrl('carwash-details');
  }

}
