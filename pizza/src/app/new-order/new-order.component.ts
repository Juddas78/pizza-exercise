import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { crusts, Order, sizes, toppings } from '../pizza/pizza.component';
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

  @Output() orderPlaced = new EventEmitter<boolean>();
  selectedToppings: string[] = [];


  constructor(private readonly http: PizzaOrderService) { }
  ngOnInit(): void {
  }

  placeOrder() {
    let details = this.orderInfo.value;
    console.log(details);
    this.http.placeOrder(details.crust, this.selectedToppings.toString(), details.size, details.table).subscribe({
      next: () =>  this.orderSuccess(),
      error: (err: HttpErrorResponse) =>  this.orderFailure(err)
    })
  }

  orderFailure(err: HttpErrorResponse): void {
    throw new Error('Method not implemented.');
  }
  orderSuccess() {
    this.orderPlaced.emit(true);
  }

  addTopping(topping: any) {
    this.selectedToppings.push(topping);
    console.log('added topping', topping, this.selectedToppings.toString());
  }

  orderInfo = new FormGroup({
    crust: new FormControl(''),
    flavor: new FormControl(''),
    size: new FormControl(''),
    table: new FormControl(''),
  });
}
