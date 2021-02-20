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
}
// Car Wash Interface
export interface ICarWash{
    name: string;
    co_ordinates: ICoordinates;
    
}
// Appointment interface
export interface IAppointment{
    id: string;
    date: string;
}