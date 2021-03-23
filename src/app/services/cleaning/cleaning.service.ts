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

  // Get cleaning services
  getCleaningServices() {
    return this.firestore.collection('Cleaning_Services').snapshotChanges();
  }

  // Get Cleaning service by Id
  getCleaningServiceById(cleaning_id: string) {
    return this.firestore.collection('Cleaning_Services').doc(cleaning_id).snapshotChanges();
  }

  // Set favorite cleaning services
  setFavorite(cleaning_id, favorite) {
    return this.firestore.collection('Cleaning_Services').doc(cleaning_id).update({
      favorite: favorite,
    });
  }

  // Get Cleaning service prices
  getCleaningServicePricesById(cleaning_id: string) {
    return this.firestore.collection('Cleaning_Services').doc(cleaning_id)
      .collection('Prices').snapshotChanges();
  }

  // Get favourite car wash
  getFavoriteCleaningServices() {
    return this.firestore.collection('Cleaning_Services', ref => ref.where('favorite', '==', true))
      .snapshotChanges();
  }

  // Get cleaning service types
  getServiceTypes(service_id: string) {
    return this.firestore.collection('Cleaning_Services').doc(service_id).collection('types_of_services').snapshotChanges();
  }

  requestList = [];
  totalPrice = 0.00;
  addUserService(service) {
    let isFound = false;
    if (this.requestList.length > 0) {
      for (let current_item in this.requestList) {
        if (this.requestList[current_item]["id"] == service.id) {
          this.totalPrice -= this.requestList[current_item]["price"];
          this.requestList.splice(this.requestList.indexOf(service), 1);
          isFound = true;
          break;
        }
      }

      if (isFound == false) {
        this.requestList.push(service);
        this.totalPrice += service.price;
      }
    } else {
      this.requestList.push(service);
      this.totalPrice += service.price;
    }
  }

  getUserServices() {
    return this.requestList;
  }

  getUserServicesTotal() {
    return this.totalPrice;
  }
  
  getViewingDates(ownerID) {
    return this.firestore
      .collection('Owner')
      .doc(ownerID)
      .collection('Cleaning_Dates')
      .doc(ownerID)
      .snapshotChanges();
  }

  address;
  addUserServiceAddress(address) {
    this.address = address;
  }

  getUserServiceAddress() {
    return this.address;
  }

  setChatID(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }

  startChat(chat) {
    const { 
      id, 
      message, 
      from, 
      to, 
      time, 
      date, 
      cleaningName, 
      requestDate, 
      requestType, 
      serviceRequest 
    } = chat;
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
        cleaningName,
        requestDate,
        requestType,
        serviceRequest
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
            cleaningName,
            requestDate,
            requestType,
            serviceRequest
          });
      });
  }

  getChats(userID) {
    return this.firestore
      .collection('chats')
      .doc(userID)
      .collection('messages', ref => ref.where('requestType','==','cleaning'))
      .snapshotChanges();
  }
}
