export interface IAddress
{
    id: number;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    customerId: number;
    deleted: boolean;
}

export class DefaultAddress implements IAddress
{
    id: number = 0;
    streetAddress: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    customerId: number = 0;
    deleted: boolean = false;
}

export const DEFAULT_ADDRESS = new DefaultAddress();