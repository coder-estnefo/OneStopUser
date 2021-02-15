import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit {

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

  gotoSetAppointment(){
    this.router.navigateByUrl('appointment');
  }
}
