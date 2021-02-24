import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {
  getCleaning: any;
  getEvent: any;
  getCleaningById: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  // Get cleaning
  getEvents(){
    return this.firestore.collection('events').snapshotChanges();
  }

  // Get Carwash by Id
  getEventById(event_id: string){
    return this.firestore.collection('events').doc(event_id).snapshotChanges();
  }

  // Set Car wash favorite
  setFavorite(event_id, favorite){
    return this.firestore.collection('events').doc(event_id).update({
      favorite: favorite,
    });
  }

  // Get car wash prices
  getEventPricesById(event_id: string){
    return this.firestore.collection('events').doc(event_id)
      .collection('Prices').snapshotChanges();
  }

  // Set appointment
  bookSlot(event_id, appointment){
    return this.firestore.collection('event').doc(event_id)
      .collection('Appointments').add({
        name: appointment.name,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        email: appointment.email  
      });
  }
}
