export interface Address {
    address1: string;
    address2: string;
    state: string;
    city: string;
    pin: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    linkedinURL?: string;
    gender: string;
    address: Address;
  }
  