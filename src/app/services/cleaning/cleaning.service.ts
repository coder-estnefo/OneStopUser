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
  getCleaningServices(){
    return this.firestore.collection('Cleaning_Services').snapshotChanges();
  }

  // Get Cleaning service by Id
  getCleaningServiceById(cleaning_id: string){
    return this.firestore.collection('Cleaning_Services').doc(cleaning_id).snapshotChanges();
  }

  // Set favorite cleaning services
  setFavorite(cleaning_id, favorite){
    return this.firestore.collection('Cleaning_Services').doc(cleaning_id).update({
      favorite: favorite,
    });
  }

  // Get Cleaning service prices
  getCleaningServicePricesById(cleaning_id: string){
    return this.firestore.collection('Cleaning_Services').doc(cleaning_id)
      .collection('Prices').snapshotChanges();
  }

  // Get favourite car wash
  getFavoriteCleaningServices(){
    return this.firestore.collection('Cleaning_Services', ref => ref.where('favorite', '==', true))
      .snapshotChanges();
  }
}
