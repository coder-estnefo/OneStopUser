import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-wash',
  templateUrl: './car-wash.page.html',
  styleUrls: ['./car-wash.page.scss'],
})
export class CarWashPage implements OnInit {

  constructor() { 

    window.addEventListener('load',()=>{
      const preload=document.querySelector('.spinner');
      //const preload=document.querySelector('.sk-circle');
      const preloadDiv=document.querySelector('.spainContainer');
      preload.classList.add('preload_finished');
      preloadDiv.classList.add('div_finished');
      
    })
     
  }

  ngOnInit() {
   
  }

}
