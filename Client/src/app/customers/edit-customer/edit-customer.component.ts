import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICustomer, DEFAULT_CUSTOMER } from 'src/models/customer.interface';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public customerService: CustomerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {
      this.formGroup = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

  @Output() customerCancelEvent = new EventEmitter();
  @Output() customerUpdateEvent = new EventEmitter();
  @Input() customer: ICustomer = DEFAULT_CUSTOMER;

  firstNameControl: FormControl = new FormControl(this.customer.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  lastNameControl: FormControl = new FormControl(this.customer.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  ngOnInit(): void {
    this.formGroup.get('firstName')?.setValue(this.customer.firstName);
    this.formGroup.get('lastName')?.setValue(this.customer.lastName);
  }

  getErrorMessage(controlName: string) {
    if (this.formGroup.get(controlName)?.hasError('required')) {
      return 'You must enter a value.';
    }

    if (this.formGroup.get(controlName)?.hasError('minlength')) {
      return 'Must not be shorter than 2 characters.'
    }

    if (this.formGroup.get(controlName)?.hasError('maxlength')) {
      return 'Must not be longer than 50 characters.'
    }

    return '';
  }

  save() {
    this.customer.firstName = this.formGroup.get('firstName')?.value;
    this.customer.lastName = this.formGroup.get('lastName')?.value;

    if (this.customer.id) {
      this.customerService.updateCustomer(this.customer).subscribe({
        next: () => {
          this.snackBar.open("The customer was updated!", undefined, { duration: 3000 });
          this.customerUpdateEvent.emit(this.customer);
        },
        error: () => this.snackBar.open("An error occurred while updating the customer", undefined, { duration: 3000 }),
      })
    }
    else {
      this.customerService.createCustomer(this.customer).subscribe({
        next: () => {
          this.snackBar.open("The customer was added!", undefined, { duration: 3000 });
          this.customerUpdateEvent.emit(this.customer);
        },
        error: () => this.snackBar.open("An error occurred while creating customer", undefined, { duration: 3000 }),
      })
    }
    
  }

  cancel() {
    this.customerCancelEvent.emit();
  }

}
