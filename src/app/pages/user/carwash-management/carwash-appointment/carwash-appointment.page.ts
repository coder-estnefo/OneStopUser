import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carwash-appointment',
  templateUrl: './carwash-appointment.page.html',
  styleUrls: ['./carwash-appointment.page.scss'],
})
export class CarwashAppointmentPage implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const carwash_id: string = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
