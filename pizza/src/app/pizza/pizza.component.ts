import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  
  @Input() pizzaDetails: {
    Crust: string;
    Flavor: string;
    Order_ID: number;
    Size: string;
    Table_No: number
  } = new Input();

  @Output() deletePizza = new EventEmitter<number>();

  
  constructor() { }
  
  ngOnInit(): void {
  }

  delete() {
    this.deletePizza.emit(this.pizzaDetails.Order_ID);
  }
  
}

export const crusts = ["Thin", "Normal", "Pan"];
export const sizes = ["S", "M", "L"];
export const toppings = ["Cheese", "Chicken", "Beef", "Pepperoni", "Mushroom", "Jalepenos", "Pineapple"];