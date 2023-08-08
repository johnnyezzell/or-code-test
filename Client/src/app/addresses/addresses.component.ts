import { Component, Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressService } from 'src/services/address.service';
import { DEFAULT_ADDRESS, IAddress } from 'src/models/address.interface';
import { DEFAULT_CUSTOMER, ICustomer } from 'src/models/customer.interface';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  @Input() selectedCustomer: ICustomer = DEFAULT_CUSTOMER;

  selectedAddress: IAddress = DEFAULT_ADDRESS;
  addressesSubject = new BehaviorSubject<IAddress[]>([]);
  addresses$ = this.addressesSubject.asObservable();

  editing = false;

  constructor(private addressService: AddressService) {
    this.refreshList(false);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshList(false);
  }

  refreshList(editing: boolean) {
    this.addressService.getAll(this.selectedCustomer.id).subscribe({
      next: (data: IAddress[]) => {
        this.addressesSubject.next(data);
        this.editing = editing;
      },
    });
  }

  selectAddress(address: IAddress) {
    this.selectedAddress = address;
  }

  newAddress() {
    this.selectedAddress = DEFAULT_ADDRESS;
    this.editing = true;
  }

  editAddress(address: IAddress) {
    this.selectedAddress = address;
  }

  cancelEdit() {
    this.editing = false;
  }

  updatedAddress() {
    this.refreshList(false);
  }

  deleteAddress() {
    this.refreshList(false);
  }
}
