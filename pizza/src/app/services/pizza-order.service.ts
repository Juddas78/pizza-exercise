import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, windowTime } from 'rxjs/operators';
import { Order } from '../pizza/pizza.component';


@Injectable({
  providedIn: 'root'
})
export class PizzaOrderService {

  constructor(private readonly http: HttpClient) { }

  orderID = 0;
  authToken = '';
  authorize(username: string, password: string): Observable<AuthResponse>{

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
      observe: 'body',
      username: username,
      password: password,
      responseType: 'json'
    }
    return this.http.post<AuthResponse>('/api/auth', options);
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  setOrderID(currentID: number) {
    this.orderID = currentID + 1;
  }

  getOrders(): Observable<Order[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
    }
    return this.http.get<Order[]>('/api/orders', options);
  }

  placeOrder(crust: string, flavor: string, size: string, table_no: number): Observable<Order> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Expose-Headers', 'Authorization');
    headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    

    const body = {
      Crust: crust,
      Flavor: flavor,
      Order_ID: this.orderID,
      Size: size,
      Table_No: table_no,
      Timestamp: windowTime,
    }
    const options = {
      headers: headers,
      access_token: this.authToken
    }
    return this.http.post<Order>('/api/orders', body, options);
  }

  deletePizza(orderID: number): Observable<{message: string}> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Expose-Headers', 'Authorization');
    headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    const options = {
      headers: headers,
      access_token: this.authToken
    }
    return this.http.delete<{message: string}>(`/api/orders/${orderID}`, options);
  }
}

export interface AuthResponse {
  access_token: string;
}
