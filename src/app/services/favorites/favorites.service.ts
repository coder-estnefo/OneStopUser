import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICarWash, ICleaning, IProperty } from 'src/app/structures/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  AddFavoriteproperty(user_id: string, property: IProperty) {
    return this.firestore.firestore.collection('Users').doc(user_id).collection('Favorites_Property').doc(property.id).set({
      ownerID: property.ownerID,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      garages: property.garages,
      description: property.description,
      images: property.images,
      availability_status: property.availability_status,
      favorite: property.favorite,
      name: property.name,
    })
  }

  AddFavoriteCarwash(user_id: string, carwash: ICarWash) {
    return this.firestore.firestore.collection('Users').doc(user_id).collection('Favorites_Carwash').doc(carwash.id).set({
      name: carwash.name,
      images: carwash.images,
      ownerID: carwash.ownerID,
      location: carwash.location,
      description: carwash.description,
    })
  }

  AddFavoriteCleaningService(user_id: string, service: ICleaning) {
    return this.firestore.firestore.collection('Users').doc(user_id).collection('Favorites_Cleaning_Service').doc(service.id).set({
      ownerID: service.ownerID,
      id: service.id,
      name: service.name,
      address: service.address,
      favorite: service.favorite,
      images: service.images,
    })
  }

  getFavoriteCarwashes(user_id: string) {
    return this.firestore.collection('Users').doc(user_id).collection('Favorites_Carwash').snapshotChanges();
  }

  getFavoriteProperties(user_id: string) {
    return this.firestore.collection('Users').doc(user_id).collection('Favorites_Property').snapshotChanges();
  }

  getFavoriteCleaningServices(user_id: string) {
    return this.firestore.collection('Users').doc(user_id).collection('Favorites_Cleaning_Service').snapshotChanges();
  }

  deleteFavoriteCarwash(user_id: string, carwash_id: string) {
    return this.firestore.firestore.collection('Users').doc(user_id).collection('Favorites_Carwash').doc(carwash_id).delete();
  }

  deleteFavoriteProperty(user_id: string, property_id: string) {
    return this.firestore.firestore.collection('Users').doc(user_id).collection('Favorites_Property').doc(property_id).delete();
  }

  deleteFavoriteCleaning(user_id: string, service_id: string) {
    return this.firestore.firestore.collection('Users').doc(user_id).collection('Favorites_Cleaning_Service').doc(service_id).delete();
  }
}
