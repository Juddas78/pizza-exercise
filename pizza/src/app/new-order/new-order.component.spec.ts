import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewOrderComponent } from './new-order.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PizzaOrderService } from '../services/pizza-order.service';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

describe('NewOrderComponent', () => {
  let component: NewOrderComponent;
  let fixture: ComponentFixture<NewOrderComponent>;
  
  let  mockPizzaService: PizzaOrderService;
  let formBuilder: FormBuilder;
  const titlecasePipeStub = { transform: (item: string) => {
    return item + ' TitleCased';
  }}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderComponent, TitleCasePipe],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{FormBuilder, useValue: formBuilder}, {PizzaOrderService, useValue: mockPizzaService}, {provide: TitleCasePipe, useValue: titlecasePipeStub}],

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
    it('makes the call with the correct value for single topping', () => {
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
      expect(spy).toHaveBeenCalledOnceWith('normal', 'pepperoni TitleCased', 'L', 1);
    });

    it('makes the call with the correct values for multiple topping', () => {
      component.orderInfo = formBuilder.group({
        crust: 'normal',
        size: 'L',
        table: 1,
      });
      component.selectedToppings = ['pepperoni', 'mushrooms', 'pineapple'];
      const spy = spyOn(mockPizzaService, 'placeOrder').and.returnValue(of({
        "Crust": "normal",
        "Flavor": "pepperoni",
        "Order_ID": 1,
        "Size": "L",
        "Table_No": 1,
        "Timestamp": "now"
      }));;
      component.placeOrder();
      expect(spy).toHaveBeenCalledOnceWith('normal', 'pepperoni, mushrooms, pineapple TitleCased', 'L', 1);
    });

    it('should call orderFailure on error response', ()=> {
      const mockResponse: HttpErrorResponse = {
        name: 'HttpErrorResponse',
        message: 'generic error response',
        error: undefined,
        ok: false,
        headers: new HttpHeaders,
        status: 500,
        statusText: '',
        url: null,
        type: HttpEventType.ResponseHeader
      };
      const ordersFailureSpy = spyOn(component, 'orderFailure');
      spyOn(mockPizzaService, 'placeOrder').and.returnValue(throwError(() => mockResponse));    
      component.placeOrder();
      expect(ordersFailureSpy).toHaveBeenCalledOnceWith();
    });
  });

  describe('orderFailure',() => {
    it('emits true for error', () => {
      const orderSpy = spyOn(component.orderError, 'emit');
      component.orderFailure();
      expect(orderSpy).toHaveBeenCalledOnceWith(true);
    });
  });

  describe('addTopping',() => {
    it('adds a topping to the array', () => {
      component.selectedToppings = ['cheese']
      component.addTopping('pepperoni');
      expect(component.selectedToppings).toEqual(['cheese', 'pepperoni']);
    });
  });

});
