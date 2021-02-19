import { IProperty } from 'src/app/structures/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.page.html',
  styleUrls: ['./property-list.page.scss'],
})
export class PropertyListPage implements OnInit {

  @Input() properties: IProperty[];
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  gotoPropertyDetails(){
    this.router.navigateByUrl('property-details');
  }
}
