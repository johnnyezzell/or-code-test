import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_ADDRESS, IAddress } from 'src/models/address.interface';
import { AddressService } from 'src/services/address.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public addressService: AddressService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {
      this.formGroup = this.fb.group({
      streetAddress: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      zip: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    });
  }

  @Input() address: IAddress = DEFAULT_ADDRESS;
  @Input() selectedCustomerId = 0;

  @Output() addressCancelEvent = new EventEmitter();
  @Output() addressUpdateEvent = new EventEmitter();
  
  ngOnInit(): void {
    this.formGroup.get('streetAddress')?.setValue(this.address.streetAddress);
    this.formGroup.get('city')?.setValue(this.address.city);
    this.formGroup.get('state')?.setValue(this.address.state);
    this.formGroup.get('zip')?.setValue(this.address.zip);
  }

  getErrorMessage(controlName: string) {
    if (this.formGroup.get(controlName)?.hasError('required')) {
      return 'You must enter a value.';
    }

    if (this.formGroup.get(controlName)?.hasError('minlength')) {
      return 'Must not be shorter than 2 characters.'
    }

    if (this.formGroup.get(controlName)?.hasError('maxlength')) {
      this.formGroup.get(controlName)?.getError('maxlength')
      return this.formGroup.get(controlName)?.getError('maxlength');
    }

    return '';
  }

  save() {
    this.address.streetAddress = this.formGroup.get('streetAddress')?.value;
    this.address.city = this.formGroup.get('city')?.value;
    this.address.state = this.formGroup.get('state')?.value;
    this.address.zip = this.formGroup.get('zip')?.value;

    if (this.address.id) {
      this.addressService.updateAddress(this.address.customerId, this.address).subscribe({
        next: () => {
          this.snackBar.open("The address was updated!", undefined, { duration: 3000 });
          this.addressUpdateEvent.emit(this.address);
        },
        error: () => this.snackBar.open("An error occurred while updating the address", undefined, { duration: 3000 }),
      })
    }
    else {
      this.addressService.createAddress(this.selectedCustomerId, this.address).subscribe({
        next: () => {
          this.snackBar.open("The address was added!", undefined, { duration: 3000 });
          this.addressUpdateEvent.emit(this.address);
        },
        error: () => this.snackBar.open("An error occurred while adding address", undefined, { duration: 3000 }),
      })
    }
    
  }

  cancel() {
    this.addressCancelEvent.emit();
  }

}
