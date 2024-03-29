import { User } from './user';

export interface Amenity {
    id:number;
    name: string;
    geographicappartment: string;
    region: string;
    city: string;
    municipality: string;
    road: string;
    number: number;
    zipcode: number;
    description: string;
    pets: boolean;
    smoking: boolean;
    gatherings: boolean;
    livingroom: boolean;
    wifi: boolean;
    ac: boolean;
    heater: boolean;
    kitchen: boolean;
    parking: boolean;
    tv: boolean;
    elevator: boolean;
    type: string;
    minprice: number;
    roomnumber: number;
    bathroomnumber: number;
    bednumber:number;
    fromdate: string;
    todate: string;
    lat: number;
    lon: number;
    user:User;
}