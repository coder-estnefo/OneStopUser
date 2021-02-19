import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  properties = [{ img: "../../../../../assets/icon/apartment1/outside/out.jfif" },
  { img: "../../../../../assets/icon/apartment1/outside/2.jfif" },
  { img: "../../../../../assets/icon/apartment1/outside/3.jpg" },
  { img: "../../../../../assets/icon/apartment1/outside/4.jfif" },
  { img: "../../../../../assets/icon/apartment1/outside/5.jfif" }];

 

  constructor(private router:Router, private userservice:UserService) { }

  ngOnInit() {
  }

  gotoMap(){
     this.router.navigate(['property-map'])

    let arry1 = [28.218370, 28.212370, 28.215370];
    let arry2 = [-25.731340, -25.735340, -25.737340];
    let arry3 = ["Librito flets availeble", "D_head flets availeble", "vivis flets availeble"];
    let mode="property"

    this.userservice.setMapDetails(arry1,arry2,arry3,mode);

    // console.log(coodinate.arry1[1])
  }

}
