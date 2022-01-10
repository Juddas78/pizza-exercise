import { HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Order } from '../pizza/pizza.component';

import { AuthResponse, PizzaOrderService } from './pizza-order.service';

describe('PizzaOrderService', () => {
  let service: PizzaOrderService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PizzaOrderService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PizzaOrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authorize', () => {
    it('should return access token with valid creds', () => {
      const mockAccessResponse: AuthResponse = {
        access_token: 'token'
      }

      service.authorize('user', 'password').subscribe(data => {
        expect(data.access_token).toEqual('token');
      });

      const req = httpTestingController.expectOne('/api/auth');

      expect(req.request.method).toEqual('POST');

      req.flush(mockAccessResponse);
    });

    it('should deny access with invalid', () => {
      const mockErrorResponse: HttpErrorResponse = {
        name: 'HttpErrorResponse',
        message: 'UNAUTHORIZED',
        error: undefined,
        ok: false,
        headers: new HttpHeaders,
        status: 401,
        statusText: '',
        url: null,
        type: HttpEventType.ResponseHeader
      }

      service.authorize('user', 'password').subscribe({
        next: (res: AuthResponse) => {},
        error: (err: HttpErrorResponse) => {
          expect(err.message).toEqual('UNAUTHORIZED');
          expect(err.status).toEqual(401);
      }})
      const req = httpTestingController.expectOne('/api/auth');
      expect(req.request.method).toEqual('POST');

      req.flush(mockErrorResponse);

    });
  })

  describe('setAuthToken', () =>{
    it('should set the auth token to the value', () => {
      const token = 'token';
      service.setAuthToken(token);
      expect(service.authToken).toEqual('token');
    });
  });

  describe('getOrders', () => {
    it('should return a list of orders correctly', () => {
      const mockOrderResponse: Order[] = [
        {
          "Crust": "NORMAL",
          "Flavor": "BEEF-NORMAL",
          "Order_ID": 1,
          "Size": "M",
          "Table_No": 1,
          "Timestamp": "2019-12-03T18:21:08.669365"
        },
        {
          "Crust": "THIN",
          "Flavor": "CHEESE",
          "Order_ID": 2,
          "Size": "S",
          "Table_No": 5,
          "Timestamp": "2019-12-03T18:21:08.708470"
        },
        {
          "Crust": "NORMAL",
          "Flavor": "CHICKEN-FAJITA",
          "Order_ID": 3,
          "Size": "L",
          "Table_No": 3,
          "Timestamp": "2019-12-03T18:21:08.710006"
        }
      ]

      service.getOrders().subscribe(data => {
        expect(data[0]).toEqual({
          "Crust": "NORMAL",
          "Flavor": "BEEF-NORMAL",
          "Order_ID": 1,
          "Size": "M",
          "Table_No": 1,
          "Timestamp": "2019-12-03T18:21:08.669365"
        });
        expect(data.length).toEqual(3);
      });

      const req = httpTestingController.expectOne('/api/orders');
      expect(req.request.method).toEqual('GET');
      req.flush(mockOrderResponse);
    });



  });

  describe('placeOrder', () => {
    it('should place the order using the correct values', () => {
      const mockOrderPlacedResponse: Order = {
        "Crust": "Normal",
        "Flavor": "Pepperoni",
        "Order_ID": 4,
        "Size": "M",
        "Table_No": 1,
        "Timestamp": "2022-01-08T22:58:59.977223"
      }

      service.placeOrder('Normal', 'Pepperoni', 'M', 1).subscribe(data => {
        expect(data.Crust).toEqual('Normal');
        expect(data.Flavor).toEqual('Pepperoni');
        expect(data.Size).toEqual('M');
        expect(data.Table_No).toEqual(1);
      });

      const req = httpTestingController.expectOne('/api/orders');

      expect(req.request.method).toEqual('POST');

      req.flush(mockOrderPlacedResponse);
    });
  });

  describe('deletePizza', () => {
    it('should return access token with valid creds', () => {
      const mockAccessResponse: { message: string } = {"message":"Order deleted"}
      const id = 1;

      service.deletePizza(id).subscribe(data => {
        expect(data.message).toEqual('Order deleted');
      });
      const req = httpTestingController.expectOne(`/api/orders/${id}`);

      expect(req.request.method).toEqual('DELETE');

      req.flush(mockAccessResponse);
    });
  })


});
