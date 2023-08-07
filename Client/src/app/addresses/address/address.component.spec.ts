import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressComponent],
      imports: [
        MatDialogModule, 
        MatSnackBarModule, 
        HttpClientModule,
        MatCardModule,
        MatDividerModule
      ]
    });
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
