import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButton } from '@angular/material/button';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking "New Customer" should replace the list of customers with new customer screen', () => {
    const fixture = TestBed.createComponent(CustomersComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    let input = fixture.debugElement.nativeElement.querySelector('.mat-mdc-input-element');
    expect(input).toBe(null);
    expect(compiled.querySelector('#add-customer')?.textContent).toContain('New Customer');
    let button = fixture.debugElement.nativeElement.querySelector('#add-customer');
    button.click();
    input = fixture.debugElement.nativeElement.querySelector('.mat-mdc-input-element');
    expect(input).toBeDefined();
  });
});
