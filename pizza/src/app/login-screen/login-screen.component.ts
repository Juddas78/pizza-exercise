import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  constructor() { }
  @Output() isLoggedIn = new EventEmitter<boolean>();


  ngOnInit(): void {
  }

  onSubmit() {
    const details = this.loginInfo.value;
    this.isLoggedIn.emit(true);
    console.log('submitted with details!', details);
  }
  
  
  loginInfo = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
}
