import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private menuController: MenuController
  ) { }

  ngOnInit(
    
  ) {}

  async openMenu() {
    await this.menuController.open();
  }
}
