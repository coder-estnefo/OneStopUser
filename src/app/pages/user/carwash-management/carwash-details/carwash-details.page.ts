import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carwash-details',
  templateUrl: './carwash-details.page.html',
  styleUrls: ['./carwash-details.page.scss'],
})
export class CarwashDetailsPage implements OnInit {

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 10,
  };

  category = {
    slidesPerView: 2.5,
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
  }

  gotoBookSlot(){
    this.router.navigateByUrl('book-slot');
  }
  gotoPrices(){
    this.router.navigate(['prices'])
  }



}
