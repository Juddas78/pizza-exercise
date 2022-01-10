import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderScreenComponent } from './order-screen.component';
import { PizzaOrderService } from '../services/pizza-order.service';
import { Order } from '../pizza/pizza.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';

describe('OrderScreenComponent', () => {
  let component: OrderScreenComponent;
  let fixture: ComponentFixture<OrderScreenComponent>;
  let  mockPizzaService: PizzaOrderService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderScreenComponent ],
      imports: [HttpClientTestingModule],
      providers: [],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderScreenComponent);
    component = fixture.componentInstance;
    mockPizzaService = TestBed.inject(PizzaOrderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getOrders', () => {
    it('should call ordersResponseSuccess on 200 response', ()=> {
      const mockResponse: Order[] = [{
        Crust: 'thin',
        Flavor: 'pizza',
        Order_ID: 1,
        Size: 'L',
        Table_No: 1,
        Timestamp: 'now o clock'
      }];
      const ordersResponseSuccess = spyOn(component, 'ordersResponseSuccess');
      spyOn(mockPizzaService, 'getOrders').and.returnValue(of(mockResponse));    
      component.getOrders();
      expect(ordersResponseSuccess).toHaveBeenCalledOnceWith(mockResponse);
    });

    it('should call ordersResponseFailure on error response', ()=> {
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
      const ordersFailureSpy = spyOn(component, 'ordersResponseFailure');
      spyOn(mockPizzaService, 'getOrders').and.returnValue(throwError(() => mockResponse));    
      component.getOrders();
      expect(ordersFailureSpy).toHaveBeenCalledOnceWith(mockResponse, 'getOrders');
    });
  });

  describe('ordersResponseSuccess', () => {
    const mockResponse: Order[] = [{
      Crust: 'thin',
      Flavor: 'pizza',
      Order_ID: 1,
      Size: 'L',
      Table_No: 1,
      Timestamp: 'now o clock'
    }, 
    {
      Crust: 'pan',
      Flavor: 'pizza',
      Order_ID: 4,
      Size: 'L',
      Table_No: 1,
      Timestamp: 'in the future'
    }];
    it('should set ordersResponseSuccess to response', () => {
      
      component.ordersResponseSuccess(mockResponse);
      expect(component.pizzaList).toEqual(mockResponse);
      expect(component.pizzaList).toEqual(mockResponse);
    });
    it('should call setOrderID with correct value', () => { 
      const orderIDSpy = spyOn(mockPizzaService, 'setOrderID');
      component.ordersResponseSuccess(mockResponse);
      expect(orderIDSpy).toHaveBeenCalledOnceWith(4);
    });
  });

});
