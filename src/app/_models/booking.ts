import { stringify } from 'querystring';
import { Amenity } from './amenity';
import { User } from './user';


export class Booking{
    id:number;
    fromdate:string;
    todate:string;
    notes:string;
    amenity:Amenity;
    user:User;
}