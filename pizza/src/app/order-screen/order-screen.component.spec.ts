import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderScreenComponent } from './order-screen.component';
import { PizzaOrderService } from '../services/pizza-order.service';

describe('OrderScreenComponent', () => {
  let component: OrderScreenComponent;
  let fixture: ComponentFixture<OrderScreenComponent>;
  let mockPizzaService = jasmine.createSpy('PizzaOrderService');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderScreenComponent ],
      imports: [HttpClientTestingModule],
      providers: [PizzaOrderService, mockPizzaService ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
