import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizza';
  loggedIn = false;
  orderDashboard = false;

  logIn(flag: boolean) {
    this.loggedIn = flag;
  }

  viewDashboard() {
    console.log('view dashboard')
    this.orderDashboard = true;
  }
  

}
