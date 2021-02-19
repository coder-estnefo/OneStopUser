import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   /* ********** Testing Tearz **************** */

   mapCoodinats={}
   mode
    /* ********** End Testing Tearz **************** */

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  // Get user
  getUser(user_id: string) {
    return this.firestore.collection('Users').doc(user_id).snapshotChanges();
  }

  // Add user
  addUser(id: string, user): void {
    const customer = {
      id,
      name: user.name,
      email: user.email
    };
    this.firestore.collection('Users').doc(id).set(customer);
  }


  /* ********** Testing Tearz **************** */

  setMapDetails(_lng,_lat,_names,_mode) {
    this.mapCoodinats={}
    this.mapCoodinats={lng:_lng,lat:_lat,names:_names}
    this.mode=_mode
  }

  getMapDetails(){
    return this.mapCoodinats;
  }


  /* ********** End testing   **************** */
}
