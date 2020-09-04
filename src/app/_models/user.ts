import { stringify } from 'querystring';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber:number;
    email:string;
    token: string;
    roles:[];
}