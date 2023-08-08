import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AddressesComponent } from './addresses/addresses.component';

const routes: Routes = [
  { 
    path: 'customers', 
    children: [
      {
        path: ':id',
        component: CustomersComponent,
        children: [
          {
            path: 'addresses',
            component: AddressesComponent
          }
        ]
      },
      {
        path: '',
        component: CustomersComponent
      }
    ]
  },
  { 
    path: '', 
    redirectTo: '/customers', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
