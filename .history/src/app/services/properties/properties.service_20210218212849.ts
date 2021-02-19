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

  }

  // Set appointment
  setAppointment(property_id, appointment){
    this.firestore.collection('Properties').doc(property_id)
      .collection('Appointments').add(appointment);
  }
}
