import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_CUSTOMER, DefaultCustomer, ICustomer } from 'src/models/customer.interface';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnDestroy{

  @Output() customerEmitter = new EventEmitter<ICustomer>();

  selectedCustomerId = 0;
  customersSubject = new BehaviorSubject<ICustomer[]>([]);
  customers$ = this.customersSubject.asObservable();

  editing: boolean = false;
  
  constructor(
    private customerService: CustomerService, 
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.selectedCustomerId = params['id'];
    })
    customerService.getAll().subscribe({
      next: (data: ICustomer[]) => this.customersSubject.next(data) 
    });
  }
  ngOnDestroy(): void {
    this.customersSubject.unsubscribe()
  }

  newCustomer() {
    this.selectedCustomerId = 0;
    this.editing = true;
  }

  selectCustomer(customer: ICustomer) {
    //this.selectedCustomer = customer;
    this.customerEmitter.emit(customer);
  }

  editCustomer(customer: ICustomer) {
    //this.selectedCustomer = customer;
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
    // this.selectedCustomer.firstName = customer.firstName;
    // this.selectedCustomer.lastName = customer.lastName;
    this.customerService.getAll().subscribe({
      next: (data: ICustomer[]) => {
        this.customersSubject.next(data);
        this.editing = false;
      }
    });
  }

}
