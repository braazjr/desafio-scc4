import { Gender } from "./gender-model";
import { FederalIdType } from "./federalIdType-model";

export class Customer {

    id: number;
    name: string;
    federalId: string;
    registration: string;
    phone: string;
    phone2: string;
    email: string;
    emailCollection: string;
    residentialPhone: string;
    commercialPhone: string;
    emergencyContact: string;
    emergencyPhone: string;
    birthday: Date;
    gender: Gender;
    federalIdType: FederalIdType;
    commercialAddress: any; 
    residentialAddress: any;
    active: boolean;
}