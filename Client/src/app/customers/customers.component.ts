import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_CUSTOMER, DefaultCustomer, ICustomer } from 'src/models/customer.interface';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  @Output() customerEmitter = new EventEmitter<ICustomer>();

  selectedCustomer: ICustomer = DEFAULT_CUSTOMER;
  customersSubject = new BehaviorSubject<ICustomer[]>([]);
  customers$ = this.customersSubject.asObservable();

  editing: boolean = false;
  
  constructor(private customerService: CustomerService) {
    customerService.getAll().subscribe({
      next: (data: ICustomer[]) => this.customersSubject.next(data) 
    });
  }

  newCustomer() {
    this.selectedCustomer = new DefaultCustomer();
    this.customerEmitter.emit(this.selectedCustomer);
    this.editing = true;
  }

  selectCustomer(customer: ICustomer) {
    this.selectedCustomer = customer;
    this.customerEmitter.emit(customer);
  }

  editCustomer(customer: ICustomer) {
    this.selectedCustomer = customer;
    this.editing = true;
  }

  deleteCustomer() {
    this.customerService.getAll().subscribe({
      next: (data: ICustomer[]) => {
        this.customersSubject.next(data);
        this.editing = false;
      }
    });
  }

  cancelEdit() {
    this.editing = false;
  }

  updateCustomer(customer: ICustomer) {
    this.selectedCustomer.firstName = customer.firstName;
    this.selectedCustomer.lastName = customer.lastName;
    this.customerService.getAll().subscribe({
      next: (data: ICustomer[]) => {
        this.customersSubject.next(data);
        this.editing = false;
      }
    });
  }

}
