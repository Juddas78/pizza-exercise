import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, windowTime } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PizzaOrderService {

  constructor(private readonly http: HttpClient) { }

  totalOrders = 0;
  authToken = '';
  authorize(username: string, password: string){

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
      observe: 'body',
      username: username,
      password: password,
      responseType: 'json'
    }
    console.log('making the request with:', options);
    return this.http.post('/api/auth', options);
  }

  getOrders() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const options = {
      headers: headers,
    }
    return this.http.get('/api/orders', options);
  }

  placeOrder(crust: string, flavor: string, size: string, table_no: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Expose-Headers', 'Authorization');
    headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    

    const body = {
      Crust: crust,
      Flavor: flavor,
      Order_ID: this.totalOrders + 1,
      Size: size,
      Table_No: table_no,
      Timestamp: windowTime,
    }
    const options = {
      headers: headers,
      access_token: this.authToken
    }
    console.log('making the request with:', options);
    return this.http.post('/api/orders', body, options);
  }

  deletePizza(orderID: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Expose-Headers', 'Authorization');
    headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    const options = {
      headers: headers,
      access_token: this.authToken
    }
    return this.http.delete(`/api/orders/${orderID}`, options);
  }

}
