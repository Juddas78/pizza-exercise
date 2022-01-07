import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  
  @Input() pizzaDetails: {
    Crust: string;
    Flavor: string;
    Order_ID: string;
    Size: string;
    Table_No: number
  } = new Input();

  
  constructor() { }
  
  ngOnInit(): void {
  }
  
}

export const crusts = ["Thin", "Normal", "Pan"];
export const sizes = ["S", "M", "L"];
export const toppings = ["Cheese", "Chicken", "Beef"];