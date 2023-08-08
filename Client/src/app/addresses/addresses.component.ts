import { Component, Input, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressService } from 'src/services/address.service';
import { DEFAULT_ADDRESS, DefaultAddress, IAddress } from 'src/models/address.interface';
import { DEFAULT_CUSTOMER, ICustomer } from 'src/models/customer.interface';
import { ActivatedRoute, Router } from '@angular/router';

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
  customerId = 0;
  id = 0;
  editing = false;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    activatedRoute.parent?.params.subscribe(params => {
      this.customerId = Number.parseInt(params['id']); 
      console.log(this.customerId);
      this.refreshList();
    });

    activatedRoute.params.subscribe(params => {
      this.id = Number.parseInt(params['id'] ?? 0);
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshList();
  }

  refreshList() {
    this.addressService.getAll(this.customerId).subscribe({
      next: (data: IAddress[]) => {
        this.addressesSubject.next(data);
      },
    });
  }

  selectAddress(address: IAddress) {
    this.selectedAddress = address;
  }

  newAddress() {
    Object.assign(this.selectedAddress, DEFAULT_ADDRESS);
    this.editing = true;
  }

  editAddress(address: IAddress) {
    this.selectedAddress = address;
  }

  cancelEdit() {
    this.editing = false;
  }

  updatedAddress() {
    this.editing = false;
    this.refreshList();
  }

  deleteAddress() {
    this.refreshList();
  }
}


