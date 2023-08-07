import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { ICustomer } from 'src/models/customer.interface';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  @Input() customer: ICustomer = { id: 0, firstName: "", lastName: "", deleted: false};
  @Input() selectedId: number = 0;

  deleted = false;

  @Output() customerSelectedEvent = new EventEmitter<ICustomer>();
  @Output() customerEditEvent = new EventEmitter<ICustomer>();
  @Output() customerDeleteEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public customerService: CustomerService
  ) {}

  edit(e: Event, customer: ICustomer) {
    e.preventDefault();
    e.stopPropagation();
    this.customerEditEvent.emit(customer);
  }

  delete(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.snackBar.open("The customer was deleted!", undefined, { duration: 3000 });
        this.deleted = true;
        this.customerDeleteEvent.emit();
      },
      error: () => this.snackBar.open("An error occurred!", undefined, { duration: 3000 })
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete',
        content: 'Delete this customer?',
        confirmFunction: () => {
          if (this.customer)
            this.delete(this.customer.id);
        },
      }
    });
  }

  select(customer: ICustomer) {
    this.selectedId = customer.id;
    this.customerSelectedEvent.emit(this.customer);
  }
}
