export interface ICustomer
{
    id: number;
    firstName: string;
    lastName: string;
    deleted: boolean;
}

export class DefaultCustomer implements ICustomer
{
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    deleted: boolean = false;
}

export const DEFAULT_CUSTOMER = new DefaultCustomer();