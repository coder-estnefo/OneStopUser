// Co-ordinates interface
export interface ICoordinates{
    latitude: string;
    longitude: string;
}

// Property interface
export interface IProperty{
    id: string;
    name: string;
    address: [];
    images: [];
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
    // favorite: boolean;
    coordinates: ICoordinates;
    images: [];
}

// Appointment interface
export interface IAppointment{
    id: string;
    date: string;
}

// Cleaning service interface
export interface ICleaning{
    id: string;
    name: string;
    favorite: boolean;
    address: [];
    images: string;
}

// Wash type interface
export interface IWashType{
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

// User interface
export interface IUser{
  id: string;
  name: string;
  email: string;
}
