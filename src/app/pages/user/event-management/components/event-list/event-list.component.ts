import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  @Input() events;
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  gotoEventDetails(){
    this.router.navigateByUrl('event-details');
  }

}
