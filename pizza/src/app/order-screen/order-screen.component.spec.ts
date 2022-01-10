import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

    it('should call errorHandler on error response', ()=> {
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
      const ordersFailureSpy = spyOn(component, 'errorHandler');
      spyOn(mockPizzaService, 'getOrders').and.returnValue(throwError(() => mockResponse));    
      component.getOrders();
      expect(ordersFailureSpy).toHaveBeenCalledOnceWith('getOrders');
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
    });
    it('should call setOrderID with correct value', () => { 
      const orderIDSpy = spyOn(mockPizzaService, 'setOrderID');
      component.ordersResponseSuccess(mockResponse);
      expect(orderIDSpy).toHaveBeenCalledOnceWith(4);
    });
  });

  describe('errorHandler', () => {
    it('should set error message for getOrders failure', () => {
      component.errorHandler('getOrders');
      expect(component.pizzaList).toEqual([]);
      expect(component.errorMessage).toEqual('There was a problem getting the orders. Please try again.');
    });

    it('should set error message for deletePizza failure', () => {
      component.errorHandler('deletePizza');
      expect(component.pizzaList).toEqual([]);
      expect(component.errorMessage).toEqual('There was a problem deleting your order. Please try again.');
    });

    it('should set error message for placeOrder failure', () => {
      component.errorHandler('placeOrder');
      expect(component.pizzaList).toEqual([]);
      expect(component.errorMessage).toEqual('There was a problem placing your order. Please try again.');
    });

    it('should set error to true', () => { 
      component.errorHandler('');
      expect(component.error).toBeTrue();
    });
  });

  describe('orderPlaced', () => {
    it('should call getOrders', () => {
      spyOn(component, 'getOrders');
      component.orderPlaced();
      expect(component.getOrders).toHaveBeenCalled();
    });
    it('should set new order to false', () => {
      component.orderPlaced();
      expect(component.newOrder).toBeFalse();
    });
    it('should set orderConfirmed to true', () => {
      component.orderPlaced();
      expect(component.orderConfirmed).toBeTrue();
    });
    it('should set error to false', () => {
      component.orderPlaced();
      expect(component.error).toBeFalse();
    });
    it('should call clearBanner', () => {
      spyOn(component, 'clearBanner');
      component.orderPlaced();
      expect(component.clearBanner).toHaveBeenCalledOnceWith('confirmed');
    });
  });

  describe('orderError', () => {
    it('should call getOrders', () => {
      spyOn(component, 'errorHandler');
      component.orderError();
      expect(component.errorHandler).toHaveBeenCalledOnceWith('placeOrder');
    });
    it('should set new order to true', () => {
      component.orderError();
      expect(component.error).toBeTrue();
    });
    it('should call orderError', () => {
      spyOn(component, 'clearBanner');
      component.orderError();
      expect(component.clearBanner).toHaveBeenCalledOnceWith('confirmed');
    });
  });

  describe('deletePizza', () => {
    it('should call deleteSuccess on 200 response', ()=> {
      const mockResponse = {"message":"Order deleted"};
      const deleteSuccess = spyOn(component, 'deleteSuccess');
      spyOn(mockPizzaService, 'deletePizza').and.returnValue(of(mockResponse));    
      component.deletePizza(1);
      expect(deleteSuccess).toHaveBeenCalledOnceWith();
    });

    it('should call deleteFailure on error response', ()=> {
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
      const ordersFailureSpy = spyOn(component, 'errorHandler');
      spyOn(mockPizzaService, 'deletePizza').and.returnValue(throwError(() => mockResponse));    
      component.deletePizza(1);
      expect(ordersFailureSpy).toHaveBeenCalledOnceWith('deletePizza');
    });
  });

  describe('deleteSuccess', () => {
    it('should call getOrders', () => {
      spyOn(component, 'getOrders');
      component.deleteSuccess();
      expect(component.getOrders).toHaveBeenCalled();
    });
    it('should set new order to true', () => {
      component.deleteSuccess();
      expect(component.deleted).toBeTrue();
    });
    it('should call clearBanner', () => {
      spyOn(component, 'clearBanner');
      component.deleteSuccess();
      expect(component.clearBanner).toHaveBeenCalledOnceWith('deleted');
    });
  });

  describe('createNewOrder', () => {
    it('should set newOrder to true', () => {
      component.createNewOrder();
      expect(component.newOrder).toBeTrue();
    });
    it('should set orderConfirmed to false', () => {
      component.createNewOrder();
      expect(component.orderConfirmed).toBeFalse();
    });
    it('should set deleted to false', () => {
      component.createNewOrder();
      expect(component.orderConfirmed).toBeFalse();
    });
  });

  describe('clearBanner', () => {
    it('should clear the deleted banner', fakeAsync(() => {
      component.deleted = true;
      component.clearBanner('deleted');
      tick(8000);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.deleted).toBeFalse();
      });
    }));

    it('should clear the confirm banner', fakeAsync(() => {
      component.orderConfirmed = true;
      component.clearBanner('confirmed');
      tick(8000);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.orderConfirmed).toBeFalse();
      });
    }));
  })

});
