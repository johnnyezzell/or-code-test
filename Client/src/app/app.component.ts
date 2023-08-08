import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DEFAULT_CUSTOMER, ICustomer } from 'src/models/customer.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'OR Test Client';
  selectedCustomer = DEFAULT_CUSTOMER;

  selectCustomer(customer: ICustomer) {
    this.selectedCustomer = customer;
  }
}
