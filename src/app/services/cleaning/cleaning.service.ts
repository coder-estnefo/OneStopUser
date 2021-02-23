import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {
  getCleaning: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  // Get cleaning
  getCleaning_Services(){
    return this.firestore.collection('Cleaning_services').snapshotChanges();
  }

  // Get Carwash by Id
  getCleaningById(cleaning_id: string){
    return this.firestore.collection('Cleaning_services').doc(cleaning_id).snapshotChanges();
  }

  // Set Car wash favorite
  setFavorite(cleaning_id, favorite){
    return this.firestore.collection('Cleaning_services').doc(cleaning_id).update({
      favorite: favorite,
    });
  }

  // Get car wash prices
  getCleaningServicePricesById(cleaning_id: string){
    return this.firestore.collection('Cleaning_services').doc(cleaning_id)
      .collection('Prices').snapshotChanges();
  }

  // Set appointment
  bookSlot(cleaning_id, appointment){
    return this.firestore.collection('Cleaning_services').doc(cleaning_id)
      .collection('Appointments').add({
        name: appointment.name,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        email: appointment.email  
      });
  }
}
