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
  addUserService(service) {
    let isFound = false;
    if (this.requestList.length > 0) {
      for (let current_item in this.requestList) {
        if (this.requestList[current_item]["id"] == service.id) {
          this.requestList.splice(this.requestList.indexOf(service), 1);
          isFound = true;
          break;
        }
      }

      if (isFound == false) {
        this.requestList.push(service);
      }
    } else {
      this.requestList.push(service);
    }
  }

  getUserServices() {
    return this.requestList;
  }
}
