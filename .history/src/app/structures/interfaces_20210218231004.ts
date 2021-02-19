// Property interface
export interface IProperty{
    id: string;
    name: string;
    location: string;
    image: [];
    price: number;
    garages: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    availability_status: boolean;
    popular: boolean;
}

// Appointment interface
export interface IAppointment{
    id: string;
    date: string;
}