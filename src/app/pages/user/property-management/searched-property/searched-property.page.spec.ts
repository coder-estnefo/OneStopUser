import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchedPropertyPage } from './searched-property.page';

describe('SearchedPropertyPage', () => {
  let component: SearchedPropertyPage;
  let fixture: ComponentFixture<SearchedPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedPropertyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchedPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
