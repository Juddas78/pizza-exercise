import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PizzaComponent } from '../pizza/pizza.component';
import { PizzaOrderService } from '../services/pizza-order.service';

@Component({
  selector: 'order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.scss']
})
export class OrderScreenComponent implements OnInit {

  constructor(private readonly http: PizzaOrderService) { }

  pizzaList: any;

  ngOnInit(): void {
    this.http.getOrders().subscribe({
      next: (res) => this.ordersSuccess(res),
      error: (err: HttpErrorResponse) => this.ordersFailure(err)
    })
  }

  ordersSuccess(res: any) {
    console.log('here are the orders', res);
    this.pizzaList = res;
    this.http.totalOrders = res.length;
  }


  ordersFailure(err: HttpErrorResponse) {

  }
  

}
