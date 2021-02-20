import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  // Get properties
  getProperties(){
    return this.firestore.collection('Properties').snapshotChanges();
  }

  // Get property by Id
  getPropertyById(property_id: string){
    return this.firestore.collection('Properties').doc(property_id).snapshotChanges();
  }

  // Get user appointments
  getUserAppointments(user_id){
    
  }

  // Set property favorite
  setFavoriteProperty(product_id, favorite){
    return this.firestore.collection('Properties').doc(carwash_id).update({
      favorite: favorite,
    });
  }

  // Set appointment
  setAppointment(property_id, appointment){
    return this.firestore.collection('Properties').doc(property_id)
      .collection('Appointments').add({
        name: appointment.name,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        email: appointment.email  
      });
  }
}
