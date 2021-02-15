import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarWashesPage } from './car-washes.page';

describe('CarWashesPage', () => {
  let component: CarWashesPage;
  let fixture: ComponentFixture<CarWashesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarWashesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarWashesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
