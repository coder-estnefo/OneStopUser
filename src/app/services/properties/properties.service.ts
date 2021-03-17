import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Get properties
  getProperties() {
    return this.firestore
      .collection('Properties', (ref) =>
        ref.where('availability_status', '==', true)
      )
      .snapshotChanges();
  }

  // Get property by Id
  getPropertyById(property_id: string) {
    return this.firestore
      .collection('Properties')
      .doc(property_id)
      .snapshotChanges();
  }

  // get favorite properties
  getFavoriteProperties() {
    return this.firestore
      .collection('Properties', (ref) => ref.where('favorite', '==', true))
      .snapshotChanges();
  }

  // Get user appointments
  getUserAppointments(user_id) {}

  // Set property favorite
  setFavoriteProperty(product_id: string, favorite: boolean) {
    return this.firestore.collection('Properties').doc(product_id).update({
      favorite: favorite,
    });
  }

  // Set appointment
  setAppointment(property_id, appointment) {
    return this.firestore
      .collection('Properties')
      .doc(property_id)
      .collection('Appointments')
      .add({
        name: appointment.name,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        email: appointment.email,
      });
  }

  setChatID(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }

  //Chat
  startChat(chat) {
    const { id, message, from, to, time, date, propertyName, appointmentDate } = chat;
    const chatID = this.setChatID(from, to) + id;
    return this.firestore
      .collection('chats')
      .doc(from)
      .collection('messages')
      .add({
        id,
        message,
        from,
        to,
        time,
        date,
        chatID,
        propertyName,
        appointmentDate
      })
      .then(() => {
        return this.firestore
          .collection('chats')
          .doc(to)
          .collection('messages')
          .add({
            id,
            message,
            from,
            to,
            time,
            date,
            chatID,
            propertyName,
            appointmentDate
          });
      });
  }

  //get chats
  getChats(userID) {
    return this.firestore
      .collection('chats')
      .doc(userID)
      .collection('messages')
      .snapshotChanges();
  }

  // //Chat
  // startChat(chat) {
  //   const { id, message, from, to, time, date } = chat;
  //   const chatID = this.setChatID(from, to);

  //   return this.firestore.collection('chats').add({
  //     id,
  //     message,
  //     from,
  //     to,
  //     time,
  //     date,
  //     chatID,
  //   });
  // }

  // //get chats
  // getChats(userID) {
  //   return this.firestore.collection('chats').snapshotChanges();
  // }

  // setChatID(uid1, uid2) {
  //   if (uid1 < uid2) {
  //     return uid1 + uid2;
  //   } else {
  //     return uid2 + uid1;
  //   }
  // }

  getViewingDates(ownerID) {
    return this.firestore
      .collection('Owner')
      .doc(ownerID)
      .collection('Property_Dates')
      .doc(ownerID)
      .snapshotChanges();
  }
}
