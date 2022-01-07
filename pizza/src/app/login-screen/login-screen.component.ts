import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PizzaOrderService } from '../services/pizza-order.service';


@Component({
  selector: 'login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  constructor(private readonly http: PizzaOrderService) { }
  @Output() isLoggedIn = new EventEmitter<boolean>();


  ngOnInit(): void {
  }

  onSubmit() {
    const details = this.loginInfo.value;
    console.log('submitted with details!', details);
    this.http.authorize(details.username, details.password).subscribe({
      next: (res) => this.loginSuccess(res),
      error: (err: HttpErrorResponse) => this.loginFailure(err)
    })

  }
  
  loginSuccess(res: any) {
    console.log(res);
    this.isLoggedIn.emit(true);
  }

  loginFailure(err: any) {
    console.error(err);
  }
  
  
  loginInfo = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
}
