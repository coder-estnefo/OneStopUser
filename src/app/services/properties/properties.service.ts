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

  // get favorite properties
  getFavoriteProperties(){
    return this.firestore.collection('Properties', ref => ref.where('favorite', '==', true))
      .snapshotChanges();
  }

  // Get user appointments
  getUserAppointments(user_id){
    
  }

  // Set property favorite
  setFavoriteProperty(product_id: string, favorite: boolean){
    return this.firestore.collection('Properties').doc(product_id).update({
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

  //Chat
  // startChat(chat) {
  //   const { id, message, from, to, time, date } = chat;

  //   return this.firestore.collection(`chats/${from}`).add({
  //     id,
  //     message,
  //     from,
  //     to,
  //     time,
  //     date,
  //   }).then(()=> {
  //     return this.firestore.collection(`chats/${from}`).add({
  //       id,
  //       message,
  //       from,
  //       to,
  //       time,
  //       date,
  //     })
  //   })
  // }

  //get chats
  // getChats(userID) {
  //   return this.firestore.collection(`chats/${userID}`).snapshotChanges();
  // }

  //Chat
  startChat(chat) {
    const { id, message, from, to, time, date } = chat;
    const chatID = this.setChatID(from, to);

    return this.firestore.collection('chats').add({
      id,
      message,
      from,
      to,
      time,
      date,
      chatID,
    });
  }

  //get chats
  getChats(userID) {
    return this.firestore.collection('chats').snapshotChanges();
  }

  setChatID(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }
}
