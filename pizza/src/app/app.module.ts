import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderScreenComponent } from './order-screen/order-screen.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PizzaComponent } from './pizza/pizza.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ErrorScreenComponent } from './error-screen/error-screen.component';
import { LoadScreenComponent } from './load-screen/load-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    OrderScreenComponent,
    PizzaComponent,
    NewOrderComponent,
    ErrorScreenComponent,
    LoadScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
