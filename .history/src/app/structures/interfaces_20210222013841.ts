// Co-Ordinates interface
export interface ICoordinates{
    latitude: string;
    longitude: string;
}

// Property interface
export interface IProperty{
    id: string;
    name: string;
    location: [];
    image: [];
    price: number;
    garages: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    availability_status: boolean;
    features: [];
    favorite: boolean;
}
// Car Wash Interface
export interface ICarWash{
    id: string;
    name: string;
    favorite: boolean;
    coordinates: ICoordinates; 
    image: string;
}
// Appointment interface
export interface IAppointment{ 
    id: string;
    date: string;
}

// Wash type
export interface IWashType{
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}