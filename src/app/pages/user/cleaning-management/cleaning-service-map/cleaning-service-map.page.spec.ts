import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CleaningServiceMapPage } from './cleaning-service-map.page';

describe('CleaningServiceMapPage', () => {
  let component: CleaningServiceMapPage;
  let fixture: ComponentFixture<CleaningServiceMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleaningServiceMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CleaningServiceMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
