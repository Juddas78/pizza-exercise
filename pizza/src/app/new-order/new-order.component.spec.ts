import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewOrderComponent } from './new-order.component';
import { PizzaOrderService } from '../services/pizza-order.service';

describe('NewOrderComponent', () => {
  let component: NewOrderComponent;
  let fixture: ComponentFixture<NewOrderComponent>;
  
  let mockPizzaService = jasmine.createSpy('PizzaOrderService');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderComponent ],
      imports: [HttpClientTestingModule],
      providers: [PizzaOrderService, mockPizzaService ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
