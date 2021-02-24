import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CleaningServicesPage } from './cleaning-services.page';

describe('CleaningServicesPage', () => {
  let component: CleaningServicesPage;
  let fixture: ComponentFixture<CleaningServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleaningServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CleaningServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
