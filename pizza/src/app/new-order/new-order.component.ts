import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { crusts, sizes, toppings } from '../pizza/pizza.component';
import { PizzaOrderService } from '../services/pizza-order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  crusts = crusts;
  sizes = sizes;
  toppings = toppings;

  constructor(private readonly http: PizzaOrderService) { }
  ngOnInit(): void {
  }

  placeOrder() {
    let details = this.orderInfo.value;
    console.log(details);
    this.http.placeOrder(details.crust, details.flavor, details.size, details.table).subscribe({
      next: (res) =>  this.orderSuccess(res),
      error: (err) =>  this.orderFailure(err)
    })
  }

  orderFailure(err: any): void {
    throw new Error('Method not implemented.');
  }
  orderSuccess(res: any) {
    console.log('order placed successfully', res);
  }

  orderInfo = new FormGroup({
    crust: new FormControl(''),
    flavor: new FormControl(''),
    size: new FormControl(''),
    table: new FormControl(''),
  });
}
