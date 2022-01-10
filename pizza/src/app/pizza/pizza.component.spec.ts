import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Order, PizzaComponent } from './pizza.component';

describe('PizzaComponent', () => {
  let component: PizzaComponent;
  let fixture: ComponentFixture<PizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete',() => {
    it('emits true for error', () => {
      const orderSpy = spyOn(component.deletePizza, 'emit');
      const pizzaDetails: Order = {
        Crust: 'thin',
        Flavor: 'pizza',
        Order_ID: 1,
        Size: 'L',
        Table_No: 1,
        Timestamp: 'now'
      };
      component.pizzaDetails = pizzaDetails;
      component.delete();
      expect(orderSpy).toHaveBeenCalledOnceWith(pizzaDetails.Order_ID);
    });
  });
});
