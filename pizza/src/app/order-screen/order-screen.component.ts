import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PizzaOrderService } from '../services/pizza-order.service';

@Component({
  selector: 'order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.scss']
})
export class OrderScreenComponent implements OnInit {
  orderConfirmed = false;

  constructor(private readonly http: PizzaOrderService) { }

  pizzaList: any;
  newOrder = false;
  deleted = false;


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.http.getOrders().subscribe({
      next: (res) => this.ordersResponseSuccess(res),
      error: (err: HttpErrorResponse) => this.ordersResponseFailure(err)
    });
  }

  orderPlaced() {
    this.getOrders();
    this.newOrder = false;
    this.orderConfirmed = true;
  }

  ordersResponseSuccess(res: any) {
    console.log('here are the orders', res);
    this.pizzaList = res;
    this.http.totalOrders = res.length;
  }

  ordersResponseFailure(err: HttpErrorResponse) {

  }

  deletePizza(orderID: number) {
    this.http.deletePizza(orderID).subscribe({
      next: (res) => this.deleteSuccess(res),
      error: (err: HttpErrorResponse) => this.ordersResponseFailure(err)
    })
  }
  deleteSuccess(res: Object): void {
    this.getOrders();
    console.log(res);
    this.deleted = true;
  }

  createNewOrder() {
    console.log('new order')
    this.newOrder = true;
    this.orderConfirmed = false;
    this.deleted = false;

  }
  

}
