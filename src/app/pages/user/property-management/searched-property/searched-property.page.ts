import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searched-property',
  templateUrl: './searched-property.page.html',
  styleUrls: ['./searched-property.page.scss'],
})
export class SearchedPropertyPage implements OnInit {

 
  propertiesDetails = [{ img: "../../../../../assets/icon/apartment1/settingroom/setting.jpg" },
                       { img: "../../../../../assets/icon/apartment1/bathroom/bathRoom.jpg" },
                       { img: "../../../../../assets/icon/apartment1/bedroom/bedRoom.jpg" },];

  // @Input() propertiesDetails;

  options = {
    slidesPerView: 1,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,}


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
