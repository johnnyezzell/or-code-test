import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersComponent],
      imports: [
        HttpClientModule, 
        RouterModule.forRoot([])
      ]
    });
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking "New Customer" should replace the list of customers with new customer screen', () => {
    
    // Create fixture
    const fixture = TestBed.createComponent(CustomersComponent);
    fixture.detectChanges();
    
    // Check to see if the input is not there (No new customer editor)
    const compiled = fixture.nativeElement as HTMLElement;
    let input = fixture.debugElement.nativeElement.querySelector('.mat-mdc-input-element');
    expect(input).toBe(null);
    
    // Click the button
    expect(compiled.querySelector('#add-customer')?.textContent).toContain('New Customer');
    let button = fixture.debugElement.nativeElement.querySelector('#add-customer');
    button.click();

    // Verify the input is there now (new customer editor)
    input = fixture.debugElement.nativeElement.querySelector('.mat-mdc-input-element');
    expect(input).toBeDefined();
  });
});
