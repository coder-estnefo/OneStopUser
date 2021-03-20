import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestServicePage } from './request-service.page';

describe('RequestServicePage', () => {
  let component: RequestServicePage;
  let fixture: ComponentFixture<RequestServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
