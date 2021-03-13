import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropertyListPage } from './property-list.page';

describe('PropertyListPage', () => {
  let component: PropertyListPage;
  let fixture: ComponentFixture<PropertyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
