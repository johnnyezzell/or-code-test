import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAddress } from "src/models/address.interface";
import { config } from "src/assets/config";

@Injectable({
    providedIn: 'root'
})
export class AddressService
{
    constructor(
        private httpClient: HttpClient
    ) {}

    getAll(customerId: number) {
        return this.httpClient.get<IAddress[]>(`${config.baseHttpReference}/customers/${customerId}/addresses`);
    }

    getById(customerId: number, id: number) {
        return this.httpClient.get<IAddress>(`${config.baseHttpReference}/customers/${customerId}/addresses/${id}`)
    }

    createAddress(customerId: number, address: IAddress) {
        return this.httpClient.post(`${config.baseHttpReference}/customers/${customerId}/addresses`, address);
    }

    updateAddress(customerId: number,address: IAddress) {
        return this.httpClient.put(`${config.baseHttpReference}/customers/${customerId}/addresses`, address);
    }

    deleteAddress(customerId: number, id: number) {
        return this.httpClient.delete(`${config.baseHttpReference}/customers/${customerId}/addresses/${id}`);        
    }
}