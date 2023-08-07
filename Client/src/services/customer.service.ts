import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IConfiguration } from "src/assets/configuration.interface";
import { ICustomer } from "src/models/customer.interface";
import { config } from "src/assets/config";

@Injectable({
    providedIn: 'root'
})
export class CustomerService
{
    constructor(
        private httpClient: HttpClient
    ) {}

    getAll() {
        return this.httpClient.get<ICustomer[]>(`${config.baseHttpReference}/customers`);
    }

    getById(id: number) {
        return this.httpClient.get<ICustomer>(`${config.baseHttpReference}/customers/${id}`)
    }

    createCustomer(customer: ICustomer) {
        return this.httpClient.post(`${config.baseHttpReference}/customers`, customer);
    }

    updateCustomer(customer: ICustomer) {
        console.log(customer);
        return this.httpClient.put(`${config.baseHttpReference}/customers`, customer);
    }

    deleteCustomer(id: number) {
        return this.httpClient.delete(`${config.baseHttpReference}/customers/${id}`);        
    }
}