import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarWashPage } from './car-wash.page';

describe('CarWashPage', () => {
  let component: CarWashPage;
  let fixture: ComponentFixture<CarWashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarWashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarWashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
