import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PizzaOrderService } from '../services/pizza-order.service';

import { LoginScreenComponent } from './login-screen.component';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let mockPizzaService = jasmine.createSpy('PizzaOrderService');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginScreenComponent ],
      imports: [HttpClientTestingModule],
      providers: [PizzaOrderService, mockPizzaService ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
