export interface ICustomer
{
    id: number;
    firstName: string;
    lastName: string;
    deleted: boolean;
    addressCount: number;
}

export class DefaultCustomer implements ICustomer
{
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    deleted: boolean = false;
    addressCount: number = 0;
}

export const DEFAULT_CUSTOMER = new DefaultCustomer();