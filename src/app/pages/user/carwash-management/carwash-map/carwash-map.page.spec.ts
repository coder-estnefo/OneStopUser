import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarwashMapPage } from './carwash-map.page';

describe('CarwashMapPage', () => {
  let component: CarwashMapPage;
  let fixture: ComponentFixture<CarwashMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarwashMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarwashMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
