import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Choice {
  id: number;
  name: string;
  price: number;
  amount: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

  package = [];
  choice = [];
  packageItemCount: BehaviorSubject<number>;
 
  @ViewChild('package', {static: false, read: ElementRef})fab: ElementRef;
​
 
  constructor(private packageService: PackageService, private modalCtrl: ModalController, private route: Router, private animateThis:  ElementRef ) {}
 
 goDate(){
   this.route.navigateByUrl('date')
 }
 
  ngOnInit() {
    this.choice = this.packageService.getChoice();
    this.package = this.packageService.getPackage();
    this.packageItemCount = this.packageService.getPackageItemCount();
  }
 
  addToPackage(choice) {
    this.packageService.addChoice(choice);
    this.animateCSS('tada');
  }
 
  async openPackage() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: PackageModalPage,
      cssClass: 'package-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
   
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
​


}
