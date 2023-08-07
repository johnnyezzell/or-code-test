import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressComponent } from './edit-address.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddressComponent],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ]
    });
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
