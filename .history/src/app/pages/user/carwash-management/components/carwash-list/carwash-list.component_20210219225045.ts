import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICarWash } from 'src/app/structures/interfaces';

@Component({
  selector: 'app-carwash-list',
  templateUrl: './carwash-list.component.html',
  styleUrls: ['./carwash-list.component.scss'],
})
export class CarwashListComponent implements OnInit {

  favourite: boolean = false;

  @Input() car_washes: ICarWash[];
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  gotoCarwashDetails(){
    this.router.navigateByUrl('carwash-details');
  }

  like(){
    this.favourite = !this.favourite;
  }

}
