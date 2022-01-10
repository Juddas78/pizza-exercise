import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Order } from '../pizza/pizza.component';
import { PizzaOrderService } from '../services/pizza-order.service';

@Component({
  selector: 'order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.scss']
})
export class OrderScreenComponent implements OnInit {
  orderConfirmed = false;
  error = false;
  errorMessage = '';

  constructor(private readonly http: PizzaOrderService) { }

  pizzaList: Order[] = [];
  newOrder = false;
  deleted = false;


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.http.getOrders().subscribe({
      next: (res) => this.ordersResponseSuccess(res),
      error: (err: HttpErrorResponse) => this.ordersResponseFailure(err, 'getOrders')
    });
  }

  orderPlaced() {
    this.getOrders();
    this.newOrder = false;
    this.orderConfirmed = true;
    this.error = false;
  }

  ordersResponseSuccess(res: Order[]) {
    this.pizzaList = res;
    const orderIDs = res.map((value: Order) => {
      return value.Order_ID;
    })
    console.log(orderIDs)
    this.http.setOrderID(Math.max(...orderIDs));
  }

  ordersResponseFailure(err: HttpErrorResponse, requestType: string) {
    if(requestType === 'deletePizza') {
      this.errorMessage = 'There was a problem deleting your order. Please try again.';
    } else if(requestType === 'getOrders') {
      this.errorMessage = 'There was a problem getting the orders. Please try again.';
    }
    this.error = true;
  }

  deletePizza(orderID: number) {
    this.http.deletePizza(orderID).subscribe({
      next: () => this.deleteSuccess(),
      error: (err: HttpErrorResponse) => this.ordersResponseFailure(err, 'deletePizza')
    })
  }
  
  deleteSuccess(): void {
    this.getOrders();
    this.deleted = true;
  }

  createNewOrder() {
    this.newOrder = true;
    this.orderConfirmed = false;
    this.deleted = false;
  }
  

}
