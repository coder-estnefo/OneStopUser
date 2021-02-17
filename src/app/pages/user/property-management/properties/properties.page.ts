import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

 

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoMap(){
    this.router.navigate(['property-map'])
    
  }

}
