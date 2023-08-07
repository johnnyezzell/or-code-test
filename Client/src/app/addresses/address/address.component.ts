import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { DEFAULT_ADDRESS, IAddress } from 'src/models/address.interface';
import { AddressService } from 'src/services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  @Input() address: IAddress = DEFAULT_ADDRESS;
  @Input() customerId: number = 0;
  @Input() selectedId: number = 0;

  deleted = false;
  editing = false;

  @Output() addressSelectedEvent = new EventEmitter<IAddress>();
  @Output() addressEditEvent = new EventEmitter<IAddress>();
  @Output() addressDeleteEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public addressService: AddressService
  ) {}

  select(address: IAddress) {
    this.address = address;
  }

  updated(address: IAddress) {
    this.address = address;
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }

  edit(e: Event, address: IAddress) {
    e.preventDefault();
    e.stopPropagation();
    this.addressEditEvent.emit(address);
    this.editing = true;
  }

  delete(id: number) {
    console.log(this.customerId);
    this.addressService.deleteAddress(this.customerId, id).subscribe({
      next: () => {
        this.snackBar.open("The customer was deleted!", undefined, { duration: 3000 });
        this.deleted = true;
        this.addressDeleteEvent.emit();
      },
      error: () => this.snackBar.open("An error occurred!", undefined, { duration: 3000 })
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete',
        content: 'Delete this address?',
        confirmFunction: () => {
          if (this.address.id)
            this.delete(this.address.id);
        },
      }
    });
  }

}
