import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor() {}

  ngOnInit(){
    this.sideMenu();
  }

  sideMenu()
	{
	  this.navigate =
	  [
		{
		  title : "Home",
		  url   : "/home",
		  icon  : "home-outline"
		},
		{
			title : "Cart",
			url   : "/cart",
			icon  : ""
		},
		{
			title : "My Orders",
			url   : "/orders",
			icon  : ""
		},
		{
			title : "Contact Us",
			url   : "/contact-us",
			icon  : ""
		},
		{
			title : "Feedback",
			url   : "/",
			icon  : ""
		},
		{
			title : "Privacy Policy",
			url   : "/privacy-policy",
			icon  : ""
		},
		{
		  title : "Settings",
		  url   : "/settings",
		  icon  : ""
		},
	  ]
  }
  
}
