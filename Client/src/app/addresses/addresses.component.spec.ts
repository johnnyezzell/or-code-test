import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesComponent } from './addresses.component';
import { HttpClientModule } from '@angular/common/http';

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressesComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
