import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarwashService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  // Get Carwash
  getCarwashes(){
    return this.firestore.collection('Carwashes').snapshotChanges();
  }

  // Get Carwash by Id
  getCarwashById(carwash_id: string){
    return this.firestore.collection('Carwashes').doc(carwash_id).snapshotChanges();
  }

  // Set Car wash favorite
  setFavorite(carwash_id, favorite){
    return this.firestore.collection('Carwashes').doc(carwash_id).update({
      favorite: favorite,
    });
  }

  // get favorite carwash
  getFavoriteCarWash(){
    return this.firestore.collection('Carwashes', ref => ref.where('favorite', '==', true))
      .snapshotChanges();
  }

  // Get car wash prices
  getCarwashPricesById(carwash_id: string){
    return this.firestore.collection('Carwashes').doc(carwash_id)
      .collection('Prices').snapshotChanges();
  }

  // Get wash types
  getWashTypes(carwash_id: string){
    return this.firestore.collection('Carwashes').doc(carwash_id)
      .collection('Wash_Types').snapshotChanges();
  }

  // Set appointment
  bookSlot(carwash_id, appointment){
    return this.firestore.collection('Carwashes').doc(carwash_id)
      .collection('Appointments').add({
        name: appointment.name,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        email: appointment.email
      });
  }
}
