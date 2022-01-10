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
  @Output() orderError = new EventEmitter<boolean>();
  selectedToppings: string[] = [];


  constructor(private readonly http: PizzaOrderService) { }
  ngOnInit(): void {
  }

  placeOrder() {
    let details = this.orderInfo.value;
    this.http.placeOrder(details.crust, this.selectedToppings.toString(), details.size, details.table).subscribe({
      next: () =>  this.orderSuccess(),
      error: () =>  this.orderFailure()
    })
  }

  orderFailure(): void {
    this.orderError.emit(true);
  }
  orderSuccess() {
    this.orderPlaced.emit(true);
  }

  addTopping(topping: any) {
    this.selectedToppings.push(topping);
  }

  orderInfo = new FormGroup({
    crust: new FormControl(''),
    size: new FormControl(''),
    table: new FormControl(''),
  });
}
