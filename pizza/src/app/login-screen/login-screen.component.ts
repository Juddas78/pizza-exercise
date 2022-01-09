import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthResponse, PizzaOrderService } from '../services/pizza-order.service';


@Component({
  selector: 'login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginError: boolean = false;

  constructor(private readonly http: PizzaOrderService) { }
  @Output() isLoggedIn = new EventEmitter<boolean>();


  ngOnInit(): void {
  }

  onSubmit() {
    const details = this.loginInfo.value;
    this.loginError = false;
    console.log('submitted with details!', details);
    this.http.authorize(details.username, details.password).subscribe({
      next: (res: AuthResponse) => this.loginSuccess(res),
      error: (err: HttpErrorResponse) => this.loginFailure(err)
    })

  }
  
  loginSuccess(res: AuthResponse) {
    console.log(res);
    this.http.setAuthToken(res.access_token);
    this.isLoggedIn.emit(true);
  }

  loginFailure(err: HttpErrorResponse) {
    console.error(err.error);
    this.loginError = true;
    this.loginInfo.reset();

  }
  
  
  loginInfo = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
}
