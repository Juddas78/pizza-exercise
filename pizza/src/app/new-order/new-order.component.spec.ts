import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewOrderComponent } from './new-order.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PizzaOrderService } from '../services/pizza-order.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('NewOrderComponent', () => {
  let component: NewOrderComponent;
  let fixture: ComponentFixture<NewOrderComponent>;
  
  let  mockPizzaService: PizzaOrderService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{FormBuilder, useValue: formBuilder}, {PizzaOrderService, useValue: mockPizzaService} ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockPizzaService = TestBed.inject(PizzaOrderService);
    formBuilder = new FormBuilder();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('placeOrder', () => {
    it('makes the call with the correct values', () => {
      component.orderInfo = formBuilder.group({
        crust: 'normal',
        size: 'L',
        table: 1,
      });
      component.selectedToppings = ['pepperoni'];
      const spy = spyOn(mockPizzaService, 'placeOrder').and.returnValue(of({
        "Crust": "normal",
        "Flavor": "pepperoni",
        "Order_ID": 1,
        "Size": "L",
        "Table_No": 1,
        "Timestamp": "now"
      }));;
      component.placeOrder();

      expect(spy).toHaveBeenCalledOnceWith('normal', 'pepperoni', 'L', 1);
    });

    // it('calls orderFailure in case of error response', () => {
    //   spyOn(mockPizzaService, 'placeOrder').and.('error in response');
    //   component.placeOrder();
    //   expect(component.orderFailure).toHaveBeenCalled();


    // })
  })
});
