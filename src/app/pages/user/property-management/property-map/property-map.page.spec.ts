import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropertyMapPage } from './property-map.page';

describe('PropertyMapPage', () => {
  let component: PropertyMapPage;
  let fixture: ComponentFixture<PropertyMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
