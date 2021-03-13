import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarwashListComponent } from './carwash-list.component';

describe('CarwashListComponent', () => {
  let component: CarwashListComponent;
  let fixture: ComponentFixture<CarwashListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarwashListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarwashListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
