import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.page.html',
  styleUrls: ['./property-details.page.scss'],
})
export class PropertyDetailsPage implements OnInit {


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
>>>>>>> 091f797bf1c7cd301df46ea5787bfcc643ba74ca
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
