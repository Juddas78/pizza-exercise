import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PizzaOrderService {

  constructor(private readonly http: HttpClient) { }
  private apiUrl = '/api/';

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

}
