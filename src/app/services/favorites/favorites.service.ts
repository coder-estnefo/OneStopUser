import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getFavoriteCarwashById(user_id: string, carwash_id: string) {
    return this.firestore.collection('Favorites').doc(user_id).collection('Favorites_Carwash').doc(carwash_id).snapshotChanges();
  }

  getFavoriteCarwashByUserId(user_id: string) {
    return this.firestore.collection('Favorites').doc(user_id).collection('Favorites_Carwash').snapshotChanges();
  }

  setFavoriteCarwash(user_id: string, carwash_id: string) {
    return this.firestore.collection('Favorites').doc(user_id).collection('Favorites_Carwash').doc(carwash_id).set({
      user_id,
      carwash_id
    });
  }

  removeFavoriteCarwash(user_id: string, carwash_id: string) {
    return this.firestore.collection('Favorites').doc(user_id).collection('Favorites_Carwash').doc(carwash_id).delete();
  }
}
